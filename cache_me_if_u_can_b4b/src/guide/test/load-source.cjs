// Load repository TypeScript for desktop checks, including real content imports.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
module.exports = function loadSource(file) {
  const previous = require.extensions['.ts'];
  try {
    require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    }).outputText, filename);
    return require(path.resolve(file));
  } finally {
    if (previous) require.extensions['.ts'] = previous;
    else delete require.extensions['.ts'];
  }
};
