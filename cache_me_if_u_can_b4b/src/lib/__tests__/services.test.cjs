const assert = require('node:assert/strict');
const Module = require('node:module');
const originalLoad = Module._load;
const originalFetch = global.fetch;
const originalTimer = global.setTimeout;
const memory = new Map();
const config = { API_URL: '' };
const fixtures = {
  KB: [], STRINGS: { listen: { ur: 'fixture Urdu', en: 'Listen' } }, LESSONS: {},
  VIDEOS: [{ id: 'curated', title: 'Practice phone', topic: ['phone'], minutes: 2 }],
};
let pauses = 0, releases = 0, failPlay = false;
const storage = {
  getItem: async (key) => memory.get(key) ?? null,
  setItem: async (key, value) => { memory.set(key, value); },
  removeItem: async (key) => { memory.delete(key); },
  clear: async () => memory.clear(),
};
Module._load = function (request, parent, main) {
  if (request === '../content') return fixtures;
  if (request === '../audio/audioMap') return { AUDIO: { clip: 1 } };
  if (request === './config' && parent.filename.endsWith('api.ts')) return config;
  if (request === './cache.json' && parent.filename.endsWith('api.ts')) return { cached: [{ id: 'cached', title: 'Cached lesson' }] };
  if (request === '@react-native-async-storage/async-storage') return storage;
  if (request === 'expo-audio') return {
    setAudioModeAsync: async () => {},
    createAudioPlayer: () => ({ pause: () => { pauses++; }, remove: () => { releases++; },
      play: () => { if (failPlay) throw new Error('Unavailable'); } }),
  };
  return originalLoad.call(this, request, parent, main);
};

module.exports = (async () => {
  try {
    const { kv } = require('../storage.ts');
    assert.equal(await kv.get('missing', 'fallback'), 'fallback');
    await kv.set('preference', { value: 1 });
    assert.deepEqual(await kv.get('preference', null), { value: 1 });
    memory.set('broken', '{invalid');
    assert.equal(await kv.get('broken', 'fallback'), 'fallback');
    await kv.clear();
    assert.equal(memory.size, 0);
    const { uiBus } = require('../uiBus.ts');
    const messages = [];
    const off = uiBus.on('helper', (payload) => messages.push(payload));
    uiBus.emit('helper', ['phone', 'name']);
    off();
    uiBus.emit('helper', ['file']);
    assert.deepEqual(messages, [['phone', 'name']]);
    const { tr } = require('../t.ts');
    assert.equal(tr('listen', 'en'), 'Listen');
    assert.equal(tr('listen', 'ur'), 'fixture Urdu');
    assert.equal(tr('missing_key', 'ur'), 'missing_key');
    const { playClip, stopClip, hasClip, initAudio } = require('../audio.ts');
    assert.equal(hasClip(), false);
    assert.equal(playClip('missing'), false);
    assert.equal(playClip('clip'), true);
    assert.equal(playClip('clip', 0.8), true);
    assert.equal(releases, 1);
    failPlay = true;
    assert.equal(playClip('clip'), false);
    assert.equal(releases, 3);
    assert.equal(pauses, 3);
    stopClip();
    await initAudio();

    const { useApp } = require('../../store/useApp.ts');
    await useApp.persist.rehydrate();
    const event = { lessonId: 'fixture', stepId: 'name', ts: 1, firstActionMs: 0,
      hintTaps: 0, stuckTaps: 0, wrongAttempts: 0, undoTaps: 0, audioReplays: 0,
      revealedAnswer: false, completed: true, exited: false, input: 'PRIVATE_TYPED_VALUE' };
    useApp.getState().addEvent(event);
    useApp.getState().set({ guideOn: true, input: 'PRIVATE_TYPED_VALUE' });
    await Promise.resolve();
    const persisted = memory.get('mashq-state');
    assert.ok(!persisted.includes('PRIVATE_TYPED_VALUE'));
    assert.equal(JSON.parse(persisted).state.guideOn, false);
    await useApp.persist.rehydrate();
    assert.equal(useApp.getState().guideOn, false);
    assert.equal(typeof useApp.getState().set, 'function');
    useApp.getState().addEvent({ ...event, firstActionMs: 100 });
    useApp.getState().addEvent({ ...event, firstActionMs: 200 });
    assert.equal(useApp.getState().baselineMs, 100);
    useApp.getState().set({ language: 'unsupported', textLevel: 99, guideOn: true, addEvent: 'invalid' });
    assert.equal(useApp.getState().language, 'ur');
    assert.equal(useApp.getState().textLevel, 0);
    assert.equal(useApp.getState().guideOn, true);
    assert.equal(typeof useApp.getState().addEvent, 'function');
    const tampered = JSON.parse(memory.get('mashq-state'));
    tampered.state.events = [null, { ...event, hintTaps: 'PRIVATE_TYPED_VALUE' }, event];
    tampered.state.struggles = { phone: 2, other: 'PRIVATE_TYPED_VALUE' };
    tampered.state.input = 'PRIVATE_TYPED_VALUE';
    memory.set('mashq-state', JSON.stringify(tampered));
    await useApp.persist.rehydrate();
    assert.equal(useApp.getState().events.length, 1);
    assert.deepEqual(useApp.getState().struggles, { phone: 2 });
    assert.equal(useApp.getState().input, undefined);
    for (let i = 0; i < 305; i++) useApp.getState().addEvent({ ...event, ts: i });
    assert.equal(useApp.getState().events.length, 300);
    for (let i = 0; i < 12; i++) useApp.getState().addResult({ lessonId: 'fixture', ts: i, score: 1, rung: 2, strength: 'Practice' });
    assert.equal(useApp.getState().results.length, 10);
    useApp.getState().reset();
    assert.equal(useApp.getState().events.length, 0);

    const { fetchVideos } = require('../../video/api.ts');
    let calls = 0;
    global.fetch = async () => { calls++; throw new Error('Offline'); };
    assert.equal((await fetchVideos('phone')).source, 'curated');
    assert.equal((await fetchVideos('cached')).source, 'cache');
    assert.equal((await fetchVideos('unknown')).source, 'none');
    config.API_URL = 'https://fixture.invalid';
    for (const query of ['', '123456789', '\u06f1\u06f2\u06f3\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9', 'pin 1234',
      '03.00.12.34.56.7', '\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19']) {
      assert.equal((await fetchVideos(query)).source, 'none');
    }
    assert.equal(calls, 0);
    assert.equal((await fetchVideos('network failure')).source, 'none');
    assert.equal(calls, 1);
    global.fetch = async () => ({ ok: false });
    assert.equal((await fetchVideos('quota')).source, 'none');
    for (const body of [null, {}, { items: 'invalid' }, { items: [null, { id: 1, title: 'invalid' }] }]) {
      global.fetch = async () => ({ ok: true, json: async () => body });
      assert.equal((await fetchVideos('malformed')).source, 'none');
    }
    global.fetch = async () => ({ ok: true, json: async () => ({ items: [{ id: 'live', title: 'Live lesson', checked: true }] }) });
    assert.deepEqual(await fetchVideos('live'), { source: 'live', items: [{ id: 'live', title: 'Live lesson' }] });
    global.setTimeout = (fn, ms) => originalTimer(fn, ms === 5000 ? 5 : ms);
    global.fetch = (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('Timed out')), { once: true });
    });
    assert.equal((await fetchVideos('timeout')).source, 'none');
    console.log('services.test.cjs passed (storage, bus, translation, audio, persistence privacy, video fallbacks)');
  } finally {
    Module._load = originalLoad;
    global.fetch = originalFetch;
    global.setTimeout = originalTimer;
  }
})();
