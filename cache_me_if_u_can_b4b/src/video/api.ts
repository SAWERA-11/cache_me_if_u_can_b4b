import { VIDEOS } from '../content';
import { looksLikeSecret } from '../helper/matcher';
import { normalizeUrdu } from '../lib/normalizeUrdu';
import { API_URL } from './config';
import cache from './cache.json';

type VideoResult = { id: string; title: string; channel?: string; checked?: boolean };
type VideoResponse = { items: VideoResult[]; source: 'curated' | 'cache' | 'live' | 'none' };

function curated(query: string): VideoResult[] {
  const terms = normalizeUrdu(query).split(' ');
  return VIDEOS.filter((video: { title: string; topic: string[] }) => {
    const haystack = normalizeUrdu(`${video.title} ${video.topic.join(' ')}`);
    return terms.some((term) => haystack.includes(term));
  }).map((video: { id: string; title: string }) => ({ id: video.id, title: video.title, checked: true }));
}

export async function fetchVideos(query: string): Promise<VideoResponse> {
  if (looksLikeSecret(query)) return { items: [], source: 'none' };
  const clean = normalizeUrdu(query);
  if (!clean) return { items: [], source: 'none' };
  const local = curated(clean);
  if (local.length) return { items: local, source: 'curated' };
  const cached = (cache as Record<string, VideoResult[]>)[clean];
  if (cached) return { items: cached, source: 'cache' };
  if (!API_URL) return { items: [], source: 'none' };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`${API_URL}/api/videos?q=${encodeURIComponent(query)}`, { signal: controller.signal });
    if (!response.ok) return { items: [], source: 'none' };
    return { items: (await response.json() as { items?: VideoResult[] }).items ?? [], source: 'live' };
  } catch {
    return { items: [], source: 'none' };
  } finally {
    clearTimeout(timeout);
  }
}
