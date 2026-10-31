/* global __dirname */
// Run all backend fixture tests without installing a TypeScript runner.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText, filename);
};
(async () => {
  for (const name of ['validators', 'runner', 'estimate']) {
    require(path.resolve(__dirname, '../../engine/__tests__/' + name + '.test.ts'));
  }
  if (fs.existsSync(path.resolve(__dirname, '../../helper/__tests__/matcher.test.ts'))) {
    require('../../helper/__tests__/matcher.test.ts');
  }
  require('../../helper/__tests__/matcher.test.cjs');
  await require('./services.test.cjs');
  require('../../engine/__tests__/useRunner.test.cjs');
})().catch((error) => { console.error(error); process.exitCode = 1; });
