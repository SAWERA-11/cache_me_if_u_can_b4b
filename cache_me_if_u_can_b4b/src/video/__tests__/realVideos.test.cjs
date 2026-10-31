const assert = require('node:assert/strict');
const Module = require('node:module');
const originalLoad = Module._load;
const originalFetch = global.fetch;
const filename = require.resolve('../api.ts');
const originalApi = require.cache[filename];
let networkCalls = 0;
Module._load = function (request, parent, main) {
  if (request === './config' && parent?.filename === filename) return { API_URL: '' };
  return originalLoad.call(this, request, parent, main);
};
global.fetch = async () => { networkCalls++; throw new Error('Offline test must never fetch'); };
delete require.cache[filename];
module.exports = (async () => {
  try {
    const { fetchVideos } = require(filename);
    const { VIDEOS } = require('../../content/index.ts');
    for (const query of ['otp', 'photo', 'password', 'scam', '\u062a\u0635\u0648\u06cc\u0631', 'how to resize photo']) {
      const result = await fetchVideos(query);
      assert.equal(result.source, 'curated', query);
      assert.ok(result.items.length > 0 && result.items.length <= 3, query);
      assert.ok(result.items.every((item) => VIDEOS.some((video) => video.id === item.id)), query);
    }
    const photo = await fetchVideos('how to resize photo');
    assert.ok(VIDEOS.find((video) => video.id === photo.items[0].id).topic.includes('photo'));
    assert.equal((await fetchVideos('how to')).source, 'none');
    assert.equal((await fetchVideos('zzzzzzzzzzzzzzz')).source, 'none');
    assert.equal((await fetchVideos('03.00.12.34.56.7')).source, 'none');
    assert.equal(networkCalls, 0);
    console.log('realVideos.test.cjs passed (real catalog, offline search, relevance, 3-item limit, secrets)');
  } finally {
    Module._load = originalLoad;
    global.fetch = originalFetch;
    if (originalApi) require.cache[filename] = originalApi;
    else delete require.cache[filename];
  }
})();
