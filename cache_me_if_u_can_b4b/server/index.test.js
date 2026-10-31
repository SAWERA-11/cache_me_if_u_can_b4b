import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createVideoApp } from './index.js';

const directory = await mkdtemp(path.join(os.tmpdir(), 'mashq-video-test-'));
let calls = 0, mode = 'success', timestamp = 0;
const app = createVideoApp({
  apiKey: 'fixture-key', cachePath: path.join(directory, 'cache.json'),
  now: () => timestamp, maxRequests: 8, timeoutMs: 10,
  fetchImpl: async (url, { signal }) => {
    calls++;
    const params = new URL(url).searchParams;
    assert.equal(params.get('safeSearch'), 'strict');
    assert.equal(params.get('videoEmbeddable'), 'true');
    assert.ok(params.get('q').endsWith('\u0627\u0631\u062f\u0648'));
    if (mode === 'quota') return { status: 403, ok: false };
    if (mode === 'malformed') return { ok: true, json: async () => null };
    if (mode === 'timeout') return new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('timeout')), { once: true });
    });
    return { ok: true, json: async () => ({ items: [null, { id: { videoId: 'video' }, snippet: { title: 'Practice', channelTitle: 'Fixture' } }] }) };
  },
});
const server = app.listen(0, '127.0.0.1');
await new Promise((resolve) => server.once('listening', resolve));
const request = (query) => fetch(`http://127.0.0.1:${server.address().port}/api/videos?q=${encodeURIComponent(query)}`);
try {
  for (const query of ['', '123456789', 'PIN 1234', '\u06f1\u06f2\u06f3\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9',
    '03.00.12.34.56.7', '\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19']) {
    assert.equal((await request(query)).status, 400);
  }
  assert.equal(calls, 0);
  assert.equal((await (await request('practice')).json()).source, 'live');
  assert.equal((await (await request('practice')).json()).source, 'cache');
  assert.equal(calls, 1);
  assert.ok(!(await readFile(path.join(directory, 'cache.json'), 'utf8')).includes('fixture-key'));
  mode = 'quota';
  assert.equal((await request('quota')).status, 429);
  mode = 'malformed';
  assert.equal((await request('malformed')).status, 502);
  mode = 'timeout';
  assert.equal((await request('timeout')).status, 502);
  for (let i = 0; i < 3; i++) await request('practice');
  assert.equal((await request('practice')).status, 429);
  timestamp = 3600001;
  assert.equal((await request('practice')).status, 200);
  console.log('server/index.test.js passed (privacy, cache, quota, timeout, rate limit)');
} finally {
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
}
