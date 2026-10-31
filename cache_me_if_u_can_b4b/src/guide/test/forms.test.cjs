// Desktop smoke tests against the actual bundled HTML, not a duplicate fixture.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const cp = require('node:child_process');
const ts = require('typescript');
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mashq-forms-'));
for (const file of ['forms/servicesForm', 'forms/walletForm']) {
  const target = path.join(dir, file + '.js');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, ts.transpileModule(fs.readFileSync('src/' + file + '.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText);
}
const { buildLens } = require('./load-source.cjs')('src/guide/lens.ts');
const browser = process.env.MASHQ_TEST_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
for (const [file, key, count, missing, lang] of [
  ['servicesForm', 'SERVICES_FORM_HTML', 13, 10, 'en'], ['walletForm', 'WALLET_FORM_HTML', 6, 3, 'en'],
  ['servicesForm', 'SERVICES_FORM_HTML', 13, 10, 'ur'], ['walletForm', 'WALLET_FORM_HTML', 6, 3, 'ur'],
]) {
  const lens = buildLens(lang);
  const html = require(path.join(dir, 'forms', file + '.js'))[key];
  const check = `
var failures=[];
function assert(name,ok){if(!ok)failures.push(name);}
assert('map count',messages.some(function(m){return m.type==='GUIDE_READY'&&m.fieldCount===${count};}));
var first=document.querySelector('input');first.value='NEVER_SEND_THIS';
var sensitive=document.querySelectorAll('input[type=password],input[autocomplete=one-time-code]');
Array.prototype.forEach.call(sensitive,function(el){
Object.defineProperty(el,'value',{get:function(){throw Error('Sensitive value inspected');}});
el.focus();assert('safety focus '+el.name+' (last message: '+messages[messages.length-1].type+')',messages[messages.length-1].type==='SENSITIVE_FOCUS');
});
first.focus();
var host=Array.from(document.documentElement.children).filter(function(el){return el.shadowRoot;})[0];
assert('Guide direction',host.shadowRoot.querySelector('section').dir==='${lang === 'ur' ? 'rtl' : 'ltr'}');
host.shadowRoot.querySelectorAll('button')[2].click();
var result=messages[messages.length-1];
assert('required check',result.type==='CHECK_RESULT'&&result.emptyRequiredCount===${missing});
assert('no typed data in bridge',JSON.stringify(messages).indexOf('NEVER_SEND_THIS')<0);
var form=document.querySelector('form');
var event=new Event('submit',{bubbles:true,cancelable:true});form.dispatchEvent(event);
assert('submit stays local',event.defaultPrevented&&document.getElementById('status').textContent==='Practice complete. Nothing was sent.');
window.__mashq.receive({type:'SET_GUIDE',on:false});assert('off cleanup',!host.isConnected&&!window.__mashq.active);
var out=document.createElement('pre');out.id='bundled-results';out.textContent=JSON.stringify(failures);document.body.appendChild(out);`;
  const target = path.join(dir, file + '-' + lang + '.html');
  fs.writeFileSync(target, html.replace('</body>', '<script>var messages=[];window.ReactNativeWebView={postMessage:function(raw){messages.push(JSON.parse(raw));}};</script><script>' + lens + '</script><script>' + check + '</script></body>'));
  const result = cp.spawnSync(browser, ['--headless=new', '--disable-gpu', '--no-first-run', '--user-data-dir=' + path.join(dir, file + '-' + lang + '-profile'), '--virtual-time-budget=1500', '--dump-dom', 'file:///' + target.replace(/\\/g, '/')], { timeout: 25000, encoding: 'utf8', windowsHide: true, maxBuffer: 2000000 });
  const match = (result.stdout || '').match(/<pre id="bundled-results">(.*?)<\/pre>/);
  if (!match || match[1] !== '[]') {
    console.error('FAIL ' + file + ' ' + lang, match?.[1] || result.error || result.stderr);
    process.exitCode = 1;
  } else console.log('PASS ' + file + ' ' + lang + ': direction, map, sensitive fields, required check, payload privacy, local submission, cleanup');
}
