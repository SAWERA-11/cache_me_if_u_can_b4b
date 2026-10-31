/* global __dirname */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { LESSON1, HICCUPS, GLOSSARY, KB, GUIDE_TEXT } = require('../../content/index.ts');
const mapFile = path.resolve(__dirname, '../../audio/audioMap.ts');
const exportsObject = {};
let assets = 0;
vm.runInNewContext(ts.transpileModule(fs.readFileSync(mapFile, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, {
  exports: exportsObject,
  require: (request) => {
    assert.match(request, /^\.\.\/\.\.\/assets\/audio\/[a-zA-Z0-9_-]+\.mp3$/);
    const filename = path.resolve(path.dirname(mapFile), request);
    assert.ok(fs.statSync(filename).size > 0, `Empty audio asset: ${request}`);
    return ++assets;
  },
});
const references = new Set(['ui_consent']);
for (const item of LESSON1.ready) if (item.audio) references.add(item.audio);
for (const step of LESSON1.steps) {
  for (const clip of Object.values(step.audio ?? {})) if (clip) references.add(clip);
}
for (const item of [...Object.values(HICCUPS), ...GLOSSARY, ...KB]) if (item.audio) references.add(item.audio);
for (const guide of Object.values(GUIDE_TEXT)) {
  references.add(guide.ui.mapAudio);
  references.add(guide.safety.audio);
  for (const item of Object.values(guide.kinds)) references.add(item.audio);
}
for (const clip of references) assert.equal(typeof exportsObject.AUDIO[clip], 'number', `Missing audio binding: ${clip}`);
console.log(`realAudio.test.cjs passed (${references.size} referenced clips bound; ${assets} nonempty assets, playback/review not asserted)`);
