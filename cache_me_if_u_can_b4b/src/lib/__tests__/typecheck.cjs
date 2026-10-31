/* global __dirname */
// Strictly check Ahmer's modules against the pending content/audio contracts.
// Virtual fixtures are compiler-only; no placeholder content enters the app.
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '../../..');
const configPath = path.join(root, 'tsconfig.json');
const config = ts.readConfigFile(configPath, ts.sys.readFile);
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const normalize = (filename) => path.resolve(filename).replace(/\\/g, '/').toLowerCase();
const fixtures = new Map([
  [normalize(path.join(root, 'src/content.ts')), `
    import type { Lesson, Bi, KBEntry, VideoItem, HiccupId, Hiccup, GlossaryTerm } from './engine/types';
    export declare const LESSONS: Record<string, Lesson>;
    export declare const STRINGS: Record<string, Bi>;
    export declare const KB: KBEntry[];
    export declare const VIDEOS: VideoItem[];
    export declare const LESSON1: Lesson;
    export declare const HICCUPS: Record<HiccupId, Hiccup>;
    export declare const GLOSSARY: GlossaryTerm[];
  `],
  [normalize(path.join(root, 'src/audio/audioMap.ts')), 'export declare const AUDIO: Record<string, number>;'],
]);
// Once teammates supply real modules, check those instead of masking them with fixtures.
if (ts.sys.fileExists(path.join(root, 'src/content.ts')) || ts.sys.fileExists(path.join(root, 'src/content/index.ts'))) {
  fixtures.delete(normalize(path.join(root, 'src/content.ts')));
}
if (ts.sys.fileExists(path.join(root, 'src/audio/audioMap.ts'))) {
  fixtures.delete(normalize(path.join(root, 'src/audio/audioMap.ts')));
}
const host = ts.createCompilerHost(parsed.options);
const originalExists = host.fileExists.bind(host);
const originalSource = host.getSourceFile.bind(host);
const originalDirectoryExists = host.directoryExists.bind(host);
host.directoryExists = (directory) => [...fixtures.keys()].some((filename) => filename.startsWith(normalize(directory) + '/')) || originalDirectoryExists(directory);
host.fileExists = (filename) => fixtures.has(normalize(filename)) || originalExists(filename);
host.getSourceFile = (filename, target, onError, createNew) => {
  const fixture = fixtures.get(normalize(filename));
  return fixture === undefined ? originalSource(filename, target, onError, createNew)
    : ts.createSourceFile(filename, fixture, target, true);
};
const files = parsed.fileNames.filter((filename) => /\/src\/(engine|helper|lib|store|video)\//.test(filename.replace(/\\/g, '/')));
const program = ts.createProgram(files, { ...parsed.options, noEmit: true }, host);
const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: (filename) => filename, getCurrentDirectory: () => root, getNewLine: () => '\n',
  }));
  process.exitCode = 1;
} else console.log('Backend strict typecheck passed' + (fixtures.size ? ' (pending modules use virtual contracts)' : ' against real content/audio modules'));
