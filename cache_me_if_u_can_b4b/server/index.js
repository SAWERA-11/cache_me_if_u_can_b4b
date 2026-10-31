import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function isSecret(value) {
  const normalized = value.replace(/[\u0660-\u0669\u06F0-\u06F9]/g,
    (digit) => String(digit.charCodeAt(0) & 15));
  const compact = normalized.replace(/[\s-]/g, '');
  return /\d{9,}/.test(compact) || /\d{4}.*\d{4}/.test(compact) || /\b(?:password|pin)\s*[:=]?\s*\d+/i.test(normalized);
}

// Injectable dependencies keep tests offline and independent of credentials.
export function createVideoApp({
  apiKey = process.env.YOUTUBE_API_KEY,
  cachePath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'cache.json'),
  fetchImpl = fetch, now = Date.now, maxRequests = 30, timeoutMs = 5000,
} = {}) {
  const app = express();
  const requests = new Map();
  const cache = new Map();
  const ready = fs.readFile(cachePath, 'utf8').then((raw) => {
    const saved = JSON.parse(raw);
    for (const [query, items] of Object.entries(saved)) {
      if (!isSecret(query) && Array.isArray(items)) cache.set(query, items);
    }
  }).catch(() => {});
  let writes = Promise.resolve();
  app.use(cors());
  app.get('/api/videos', async (req, res) => {
    const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    if (!query || query.length > 200 || isSecret(query)) return res.status(400).json({ error: 'invalid query' });
    const timestamp = now();
    for (const [ip, times] of requests) {
      if (timestamp - times.at(-1) >= 3600000) requests.delete(ip);
    }
    const recent = (requests.get(req.ip) ?? []).filter((time) => timestamp - time < 3600000);
    if (recent.length >= maxRequests) return res.status(429).json({ error: 'rate limit exceeded' });
    requests.set(req.ip, [...recent, timestamp]);
    await ready;
    if (cache.has(query)) return res.json({ items: cache.get(query), source: 'cache' });
    if (!apiKey) return res.status(503).json({ error: 'video search unavailable' });
    const params = new URLSearchParams({
      part: 'snippet', type: 'video', maxResults: '3', q: `${query} \u0627\u0631\u062f\u0648`,
      videoEmbeddable: 'true', videoDuration: 'short', safeSearch: 'strict',
      relevanceLanguage: 'ur', regionCode: 'PK', key: apiKey,
    });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(`https://www.googleapis.com/youtube/v3/search?${params}`, { signal: controller.signal });
      if (response.status === 403) return res.status(429).json({ error: 'video quota exceeded' });
      if (!response.ok) return res.status(502).json({ error: 'video search failed' });
      const data = await response.json();
      if (!data || !Array.isArray(data.items)) return res.status(502).json({ error: 'video search failed' });
      const items = data.items.filter((item) => typeof item?.id?.videoId === 'string'
        && typeof item?.snippet?.title === 'string').slice(0, 3).map((item) => ({
        id: item.id.videoId, title: item.snippet.title,
        ...(typeof item.snippet.channelTitle === 'string' ? { channel: item.snippet.channelTitle } : {}),
      }));
      cache.set(query, items);
      // Serialize writes; read-only persistence must not break a successful search.
      writes = writes.then(() => fs.writeFile(cachePath, JSON.stringify(Object.fromEntries(cache), null, 2))).catch(() => {});
      await writes;
      return res.json({ items, source: 'live' });
    } catch {
      return res.status(502).json({ error: 'video search failed' });
    } finally {
      clearTimeout(timer);
    }
  });
  return app;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 8787);
  createVideoApp().listen(port, () => console.log(`Mashq video server listening on ${port}`));
}
