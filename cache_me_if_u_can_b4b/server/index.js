import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT ?? 8787);
const cachePath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'cache.json');
const requests = new Map();
const MAX_REQUESTS = 30;

app.use(cors());

async function readCache() {
  try {
    return JSON.parse(await fs.readFile(cachePath, 'utf8'));
  } catch {
    return {};
  }
}

async function writeCache(cache) {
  await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));
}

function isSecret(value) {
  const normalized = value.replace(/[\u0660-\u0669\u06F0-\u06F9]/g,
    (digit) => String(digit.charCodeAt(0) & 15));
  const compact = normalized.replace(/[\s-]/g, '');
  return /\d{9,}/.test(compact) || /\d{4}.*\d{4}/.test(compact) || /\b(?:password|pin)\s*[:=]?\s*\d+/i.test(normalized);
}

app.get('/api/videos', async (req, res) => {
  const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  if (!query || isSecret(query)) return res.status(400).json({ error: 'invalid query' });
  const ip = req.ip;
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter((timestamp) => now - timestamp < 60 * 60 * 1000);
  if (recent.length >= MAX_REQUESTS) return res.status(429).json({ error: 'rate limit exceeded' });
  requests.set(ip, [...recent, now]);

  const cache = await readCache();
  if (cache[query]) return res.json({ items: cache[query], source: 'cache' });
  if (!process.env.YOUTUBE_API_KEY) return res.status(503).json({ error: 'video search unavailable' });

  const params = new URLSearchParams({
    part: 'snippet', type: 'video', maxResults: '3', q: `${query} اردو`,
    videoEmbeddable: 'true', videoDuration: 'short', safeSearch: 'strict',
    relevanceLanguage: 'ur', regionCode: 'PK', key: process.env.YOUTUBE_API_KEY,
  });
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
    if (response.status === 403) return res.status(429).json({ error: 'video quota exceeded' });
    if (!response.ok) return res.status(502).json({ error: 'video search failed' });
    const data = await response.json();
    const items = (data.items ?? []).map((item) => ({
      id: item.id?.videoId,
      title: item.snippet?.title,
      channel: item.snippet?.channelTitle,
    })).filter((item) => item.id && item.title);
    cache[query] = items;
    await writeCache(cache);
    return res.json({ items, source: 'live' });
  } catch {
    return res.status(502).json({ error: 'video search failed' });
  }
});

app.listen(port, () => console.log(`Mashq video server listening on ${port}`));
