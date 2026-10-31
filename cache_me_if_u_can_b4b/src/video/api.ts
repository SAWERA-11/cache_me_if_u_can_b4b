import { VIDEOS } from '../content';
import { looksLikeSecret } from '../helper/matcher';
import { normalizeUrdu } from '../lib/normalizeUrdu';
import { API_URL } from './config';
import cache from './cache.json';

type VideoResult = { id: string; title: string; channel?: string; checked?: boolean };
type VideoResponse = { items: VideoResult[]; source: 'curated' | 'cache' | 'live' | 'none' };
const stopWords = new Set('a an the how what is to for of in on my ka ki ke kya hai ko se mein'.split(' '));

function validItems(value: unknown): VideoResult[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is VideoResult => !!item && typeof item === 'object'
    && typeof item.id === 'string' && typeof item.title === 'string'
    && (item.channel === undefined || typeof item.channel === 'string'))
    .slice(0, 3).map((item) => ({ id: item.id, title: item.title,
      ...(item.channel ? { channel: item.channel } : {}) }));
}

function curated(query: string): VideoResult[] {
  const terms = [...new Set(normalizeUrdu(query).split(' ').filter((term) => !!term && !stopWords.has(term)))];
  return VIDEOS.map((video) => {
    const topics = new Set(normalizeUrdu(video.topic.join(' ')).split(' '));
    const title = new Set(normalizeUrdu(video.title).split(' '));
    const score = terms.reduce((sum, term) => sum + (topics.has(term) ? 4 : title.has(term) ? 1 : 0), 0);
    return { video, score };
  }).filter((match) => match.score > 0).sort((a, b) => b.score - a.score).slice(0, 3)
    .map(({ video }) => ({ id: video.id, title: video.title, checked: true }));
}

export async function fetchVideos(query: string): Promise<VideoResponse> {
  if (looksLikeSecret(query)) return { items: [], source: 'none' };
  const clean = normalizeUrdu(query);
  if (!clean) return { items: [], source: 'none' };
  const local = curated(clean);
  if (local.length) return { items: local, source: 'curated' };
  const cached = (cache as Record<string, VideoResult[]>)[clean];
  if (Array.isArray(cached)) return { items: validItems(cached), source: 'cache' };
  if (!API_URL) return { items: [], source: 'none' };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`${API_URL}/api/videos?q=${encodeURIComponent(query)}`, { signal: controller.signal });
    if (!response.ok) return { items: [], source: 'none' };
    const body: unknown = await response.json();
    const items = body && typeof body === 'object' && 'items' in body ? validItems(body.items) : [];
    return items.length ? { items, source: 'live' } : { items: [], source: 'none' };
  } catch {
    return { items: [], source: 'none' };
  } finally {
    clearTimeout(timeout);
  }
}
