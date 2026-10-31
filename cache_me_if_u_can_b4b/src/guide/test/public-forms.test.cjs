// Read-only public-form smoke checks using Edge's DevTools protocol.
// Does not type, upload files or submit a form. Desktop evidence only.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const forms = [
  'https://www.selenium.dev/selenium/web/web-form.html',
  'https://httpbin.org/forms/post',
];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mashq-public-'));
const lens = require('./load-source.cjs')('src/guide/lens.ts').buildLens('en');

async function main() {
  const browser = cp.spawn(process.env.MASHQ_TEST_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0', '--user-data-dir=' + dir, 'about:blank',
  ], { stdio: 'ignore', windowsHide: true });
  let socket;
  const pending = new Map();
  let id = 0;
  function send(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      const requestId = ++id;
      const timer = setTimeout(() => { pending.delete(requestId); reject(Error(method + ' timed out')); }, 20000);
      pending.set(requestId, { resolve, reject, timer });
      socket.send(JSON.stringify({ id: requestId, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }
  try {
    browser.on('error', error => console.error(error.message));
    const portFile = path.join(dir, 'DevToolsActivePort');
    for (let attempt = 0; attempt < 100 && !fs.existsSync(portFile); attempt++) await sleep(100);
    assert.ok(fs.existsSync(portFile), 'Edge debugging endpoint is available');
    const [port, endpoint] = fs.readFileSync(portFile, 'utf8').trim().split(/\r?\n/);
    socket = new WebSocket('ws://127.0.0.1:' + port + endpoint);
    await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      const request = pending.get(message.id);
      if (!request) return;
      pending.delete(message.id); clearTimeout(request.timer);
      if (message.error) request.reject(Error(message.error.message)); else request.resolve(message.result);
    });
    for (const url of forms) {
      const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
      try {
        const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
        const evaluate = async expression => {
          const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
          if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
          return result.result.value;
        };
        await send('Page.enable', {}, sessionId);
        const navigation = await send('Page.navigate', { url }, sessionId);
        assert.ok(!navigation.errorText, navigation.errorText);
        let loaded = false;
        for (let attempt = 0; attempt < 60; attempt++) {
          loaded = await evaluate("document.readyState !== 'loading' && !!document.querySelector('form input')");
          if (loaded) break;
          await sleep(200);
        }
        assert.ok(loaded, 'Public form loaded: ' + url);
        await evaluate('window.__guideMessages=[];window.ReactNativeWebView={postMessage:function(raw){window.__guideMessages.push(JSON.parse(raw));}};' + lens);
        const result = await evaluate(`(function () {
          var messages=window.__guideMessages;
          var map=messages.filter(function(m){return m.type==='GUIDE_READY';})[0];
          var first=Array.from(document.querySelectorAll('input,select,textarea')).filter(function(el){return !el.disabled&&el.type!=='password'&&el.getClientRects().length>0;})[0];
          first.focus();
          var focus=messages[messages.length-1].type==='FIELD_HELP';
          var host=Array.from(document.documentElement.children).filter(function(el){return el.shadowRoot;})[0];
          var password=document.querySelector('input[type=password]'),safety=null;
          if(password){Object.defineProperty(password,'value',{configurable:true,get:function(){throw Error('Sensitive value read');}});password.focus();safety=messages[messages.length-1].type==='SENSITIVE_FOCUS';}
          first.focus();host.shadowRoot.querySelectorAll('button')[2].click();
          var check=messages[messages.length-1].type==='CHECK_RESULT';
          var jargon=!!document.querySelector('[data-mashq-jargon]');
          var before=messages.length;
          window.__mashq.receive({type:'SET_GUIDE',on:false});
          first.blur();first.focus();
          return {url:location.origin+location.pathname,fieldCount:map&&map.fieldCount,map:!!map,focus:focus,safety:safety,check:check,jargon:jargon,off:!host.isConnected&&messages.length===before};
        })()`);
        assert.ok(result.map && result.focus && result.check && result.off && result.safety !== false, JSON.stringify(result));
        // Reinjection should work after cleanup and should be idempotent while active.
        await evaluate(lens); await evaluate(lens);
        const bars = await evaluate("Array.from(document.documentElement.children).filter(function(el){return el.shadowRoot;}).length");
        assert.equal(bars, 1);
        console.log('PASS ' + JSON.stringify({ ...result, reinjection: true, jargon: result.jargon || 'not applicable: no matching placeholder term' }));
      } catch (error) { process.exitCode = 1; console.error('FAIL ' + url + ': ' + error.message); }
      finally { await send('Target.closeTarget', { targetId }); }
    }
  } finally {
    if (socket?.readyState === WebSocket.OPEN) {
      try { await send('Browser.close'); } catch { /* Browser may close its socket before replying. */ }
      socket.close();
    }
    for (const request of pending.values()) { clearTimeout(request.timer); request.reject(Error('Browser closed')); }
    browser.kill();
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
