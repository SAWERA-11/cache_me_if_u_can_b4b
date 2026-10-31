
/* eslint-disable no-var -- The injected script must remain ES5-style JavaScript. */
/* eslint-disable no-unused-expressions -- WebView injection must finish with true. */
(function () {
  if (window.__mashq && window.__mashq.active) return;
  var dict = {"lang":"en","placeholder":false,"ui":{"listen":"Listen","helper":"Help","check":"Check","hide":"Hide","missing":"Empty boxes","allgood":"Everything looks filled","mapTitle":"Form map","boxes":"boxes","required":"required","needFile":"a photo is needed","mapAudio":"guide_map"},"safety":{"title":"Stop for a moment","body":"Do not share this code or PIN with anyone who calls you, even if they sound official.","audio":"guide_safety"},"kinds":{"name":{"title":"Name","asks":"This box wants the name exactly as on the ID card.","format":"Copy it letter by letter","audio":"kind_name"},"dob":{"title":"Date of birth","asks":"This box wants the date you were born.","format":"07-03-1958","audio":"kind_dob"},"id_number":{"title":"ID card number","asks":"This box wants the 13-digit number on the ID card.","format":"digits only unless the form shows dashes","audio":"kind_id_number"},"phone":{"title":"Mobile number","asks":"This box wants your mobile number.","format":"0300-1234567","audio":"kind_phone"},"email":{"title":"Email","asks":"This box wants an email address, if you have one.","format":"name@example.com","audio":"kind_email"},"address":{"title":"Address","asks":"This box wants where you live: house, street, area and city.","format":"Copy it from the back of the ID card","audio":"kind_address"},"choice":{"title":"Choice","asks":"This box wants you to pick one answer from a list.","format":"Tap one answer","audio":"kind_choice"},"file":{"title":"Photo or file","asks":"This box wants a photo or a scanned paper.","format":"Bright, flat, all four corners visible","audio":"kind_file"},"checkbox":{"title":"Tick box","asks":"This box wants a tick to say you agree or confirm.","format":"Read the line next to it first","audio":"kind_checkbox"},"generic":{"title":"Box","asks":"Read the words above this box. They say what it wants.","audio":"kind_generic"}},"glossary":[{"id":"storage_full","pattern":"\\bstorage( (is )?full)?\\b|اسٹوریج|سٹوریج"},{"id":"sync","pattern":"\\bsync(ing|ed)?\\b|سنک|سنکنگ"},{"id":"cloud","pattern":"\\bcloud\\b|کلاؤڈ"},{"id":"menu","pattern":"\\bmenu\\b|\\bthree dots\\b|\\bhamburger\\b|مینیو|مینو"},{"id":"cache","pattern":"\\b(clear )?cache\\b|کیشے"},{"id":"allow_access","pattern":"\\ballow access\\b|\\bpermissions?\\b|اجازت"},{"id":"settings","pattern":"\\bsettings?\\b|\\bgear icon\\b|سیٹنگز|سیٹنگ|ترتیبات"},{"id":"otp","pattern":"\\bOTP\\b|او ٹی پی"},{"id":"pin","pattern":"\\bPIN\\b|پن کوڈ|پِن"},{"id":"cnic","pattern":"\\bCNIC\\b|شناختی کارڈ|\\bID card\\b"},{"id":"domicile","pattern":"\\bdomicile\\b|ڈومیسائل|ڈومیسال"},{"id":"account_title","pattern":"\\baccount title\\b|اکاؤنٹ ٹائٹل|اکاؤنٹ کا نام"},{"id":"beneficiary","pattern":"\\bbeneficiary\\b|بینیفیشری|وصول کنندہ"},{"id":"verification_code","pattern":"\\bverification code\\b|تصدیقی کوڈ"},{"id":"session_expired","pattern":"\\bsession (has )?expired\\b|سیشن ختم"},{"id":"captcha","pattern":"\\bcaptcha\\b|کیپچا"},{"id":"upload","pattern":"\\bupload(ed|ing)?\\b|اپ لوڈ"},{"id":"download","pattern":"\\bdownload(ed|ing)?\\b|ڈاؤن لوڈ"},{"id":"attachment","pattern":"\\battach(ment|ments|ed)?\\b|اٹیچمنٹ|منسلک"},{"id":"link","pattern":"\\blinks?\\b|لنک"},{"id":"password","pattern":"\\bpass ?word\\b|پاس ورڈ"},{"id":"username","pattern":"\\buser ?name\\b|یوزر نیم|صارف نام"},{"id":"submit","pattern":"\\bsubmit\\b|سبمٹ|جمع کرائیں"},{"id":"confirm","pattern":"\\bconfirm\\b|کنفرم|تصدیق کریں"},{"id":"terms_and_conditions","pattern":"\\bterms (and|&) conditions\\b|شرائط و ضوابط"},{"id":"kyc","pattern":"\\bKYC\\b|کے وائی سی"},{"id":"wallet","pattern":"\\bwallet\\b|والٹ"},{"id":"transaction_id","pattern":"\\btransaction (id|number)\\b|ٹرانزیکشن"},{"id":"receipt","pattern":"\\breceipt\\b|رسید"},{"id":"login","pattern":"\\blog ?in\\b|\\bsign ?in\\b|لاگ ان|لاگ اِن"},{"id":"logout","pattern":"\\blog ?out\\b|\\bsign ?out\\b|لاگ آؤٹ"},{"id":"profile","pattern":"\\bprofile\\b|پروفائل"},{"id":"install","pattern":"\\binstall(ed|ing)?\\b|انسٹال"},{"id":"update","pattern":"\\bupdate[sd]?\\b|اپ ڈیٹ"},{"id":"notification","pattern":"\\bnotifications?\\b|نوٹیفکیشن|اطلاع"},{"id":"screenshot","pattern":"\\bscreen ?shots?\\b|اسکرین شاٹ|سکرین شاٹ"},{"id":"inbox","pattern":"\\binbox\\b|ان باکس"},{"id":"spam","pattern":"\\bspam\\b|اسپیم|سپیم"}]};
  var state = { active: true, fields: [], audio: dict.ui.mapAudio, timer: null, ready: {}, marks: [] };
  window.__mashq = state;
  function post(type, payload) {
    var msg = { type: type }, key;
    for (key in payload) if (Object.prototype.hasOwnProperty.call(payload, key)) msg[key] = payload[key];
    try { window.ReactNativeWebView.postMessage(JSON.stringify(msg)); } catch (_ignore) {}
  }
  function style(el, props) { for (var key in props) el.style[key] = props[key]; return el; }
  var host = style(document.createElement('div'), { position: 'fixed', insetInlineStart: '0', bottom: '0', width: '100%', zIndex: '2147483647' });
  var root = host.attachShadow({ mode: 'open' });
  host.dir = dict.lang === 'ur' ? 'rtl' : 'ltr';
  var bar = style(document.createElement('section'), { background: '#fffbea', color: '#182f2b', padding: '16px', font: '20px sans-serif', maxHeight: '45vh', overflow: 'auto', borderTop: '3px solid #186458', boxSizing: 'border-box' });
  bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Form Guide');
  var text = document.createElement('div'); text.setAttribute('aria-live', 'polite'); bar.appendChild(text);
  var buttons = style(document.createElement('div'), { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' });
  bar.appendChild(buttons); root.appendChild(bar); document.documentElement.appendChild(host);
  function show(message, audio, sensitive) {
    text.textContent = message; state.audio = audio;
    helper.hidden = !!sensitive; check.hidden = !!sensitive;
  }
  function button(label, action) {
    var el = style(document.createElement('button'), { font: '20px sans-serif', minHeight: '56px', padding: '12px', color: '#fff', background: '#186458', border: '0', borderRadius: '8px' });
    el.type = 'button'; el.textContent = label; el.addEventListener('click', action); buttons.appendChild(el); return el;
  }
  button(dict.ui.listen, function () { post('PLAY_AUDIO', { audioId: state.audio }); });
  var helper = button(dict.ui.helper, function () {
    var kinds = []; state.fields.forEach(function (f) { if (f.kind !== 'sensitive' && kinds.indexOf(f.kind) < 0) kinds.push(f.kind); });
    post('ASK_HELPER', { kinds: kinds });
  });
  var check = button(dict.ui.check, checkFields);
  button(dict.ui.hide, function () { post('GUIDE_OFF', {}); state.receive({ type: 'SET_GUIDE', on: false }); });
  function visible(el) { var css = window.getComputedStyle(el); return el.getClientRects().length > 0 && css.display !== 'none' && css.visibility !== 'hidden' && css.visibility !== 'collapse'; }
  function label(el) {
    var parts = [], i, ids;
    if (el.labels) for (i = 0; i < el.labels.length; i++) parts.push(el.labels[i].textContent || '');
    parts.push(el.getAttribute('aria-label') || '');
    ids = (el.getAttribute('aria-labelledby') || '').split(/\s+/);
    ids.forEach(function (id) { var node = document.getElementById(id); if (node) parts.push(node.textContent || ''); });
    parts.push(el.getAttribute('placeholder') || '', el.getAttribute('name') || '', el.id || '');
    return parts.join(' ').replace(/\s+/g, ' ').trim().slice(0, 80);
  }
  function kind(el, title) {
    var type = (el.getAttribute('type') || '').toLowerCase();
    var auto = (el.getAttribute('autocomplete') || '').toLowerCase();
    var hint = [title, el.getAttribute('name') || '', el.id || '', el.getAttribute('placeholder') || '', el.getAttribute('aria-label') || ''].join(' ').toLowerCase();
    if (type === 'password' || /one-time-code|cc-/.test(auto) || /otp|one[ -]?time|verification|pin|cvv|cvc|card[ _-]?(number|no)|credit[ _-]?card|debit[ _-]?card|passw/.test(hint)) return 'sensitive';
    if (el.tagName === 'SELECT' || type === 'radio') return 'choice';
    if (type === 'file') return 'file';
    if (type === 'checkbox') return 'checkbox';
    if (/birth|\bdob\b/.test(hint)) return 'dob';
    if (type === 'tel' || /phone|mobile/.test(hint)) return 'phone';
    if (type === 'email' || /email/.test(hint)) return 'email';
    if (/cnic|national[ _-]?id|id[ _-]?number/.test(hint)) return 'id_number';
    if (/address/.test(hint)) return 'address';
    if (/name/.test(hint)) return 'name';
    return 'generic';
  }
  function required(el) { return el.required || el.getAttribute('aria-required') === 'true'; }
  function scan() {
    state.fields = [];
    Array.prototype.forEach.call(document.querySelectorAll('input,select,textarea'), function (el) {
      if (/^(hidden|submit|button|reset|image)$/i.test(el.type) || !visible(el) || el.disabled) return;
      var title = label(el); state.fields.push({ el: el, label: title, kind: kind(el, title) });
    });
    jargon();
    var url = location.protocol + '//' + location.host + location.pathname;
    if (state.fields.length && !state.ready[url]) {
      state.ready[url] = true;
      var count = state.fields.filter(function (f) { return required(f.el); }).length;
      var file = state.fields.some(function (f) { return f.kind === 'file'; });
      show(dict.ui.mapTitle + ': ' + state.fields.length + ' ' + dict.ui.boxes + ', ' + count + ' ' + dict.ui.required + (file ? '. ' + dict.ui.needFile : ''), dict.ui.mapAudio, false);
      post('GUIDE_READY', { url: url, fieldCount: state.fields.length, requiredCount: count });
    }
    var active = document.activeElement;
    if (active && /^(INPUT|SELECT|TEXTAREA)$/.test(active.tagName) && kind(active, label(active)) === 'sensitive') focus({ target: active });
  }
  function focus(event) {
    var el = event.target;
    if (!el || !/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) return;
    var title = label(el), fieldKind = kind(el, title);
    if (fieldKind === 'sensitive') { show(dict.safety.title + '. ' + dict.safety.body, dict.safety.audio, true); post('SENSITIVE_FOCUS', {}); return; }
    var entry = dict.kinds[fieldKind]; show(entry.title + '. ' + entry.asks + (entry.format ? ' ' + entry.format : ''), entry.audio, false);
    post('FIELD_HELP', { fieldKind: fieldKind });
  }
  function checkFields() {
    var empty = [];
    state.fields.forEach(function (f) {
      var el = f.el;
      if (!visible(el) || el.disabled || !required(el) || kind(el, label(el)) === 'sensitive') return;
      var missing;
      if (el.type === 'radio') {
        missing = !state.fields.some(function (other) { return other.el.type === 'radio' && other.el.name === el.name && other.el.form === el.form && (el.name || other.el === el) && other.el.checked; });
      } else if (el.type === 'checkbox') missing = !el.checked;
      else missing = el.value.length === 0;
      if (missing) empty.push(f.label || dict.kinds.generic.title);
    });
    show(empty.length ? dict.ui.missing + ': ' + empty.join(', ') : dict.ui.allgood, dict.ui.mapAudio, false);
    post('CHECK_RESULT', { emptyRequiredCount: empty.length });
  }
  function jargon() {
    Array.prototype.forEach.call(document.querySelectorAll('label,legend'), function (el) {
      if (el.hasAttribute('data-mashq-done')) return;
      el.setAttribute('data-mashq-done', '1'); state.marks.push(el);
      var walker = document.createTreeWalker(el, 4), nodes = [], node;
      while ((node = walker.nextNode())) nodes.push(node);
      nodes.some(function (textNode) {
        return dict.glossary.some(function (term) {
          var match; try { match = new RegExp(term.pattern, 'i').exec(textNode.nodeValue); } catch (_ignore) { return false; }
          if (!match || !match[0]) return false;
          var tail = textNode.splitText(match.index); tail.splitText(match[0].length);
          var span = style(document.createElement('span'), { textDecoration: 'underline dotted', cursor: 'pointer', display: 'inline-block', minHeight: '56px' });
          span.setAttribute('data-mashq-jargon', term.id); span.setAttribute('role', 'button'); span.tabIndex = 0;
          span.textContent = tail.nodeValue;
          tail.parentNode.replaceChild(span, tail);
          return true;
        });
      });
    });
  }
  function tap(event) {
    var target = event.target;
    if (target && target.getAttribute && target.hasAttribute('data-mashq-jargon')) {
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault(); event.stopPropagation(); post('JARGON', { termId: target.getAttribute('data-mashq-jargon') });
    }
  }
  var observer = new MutationObserver(function () { clearTimeout(state.timer); state.timer = setTimeout(scan, 400); });
  state.receive = function (msg) {
    if (!msg || msg.type !== 'SET_GUIDE' || msg.on !== false) return;
    state.active = false; clearTimeout(state.timer); observer.disconnect();
    document.removeEventListener('focusin', focus); document.removeEventListener('click', tap); document.removeEventListener('keydown', tap);
    state.marks.forEach(function (el) { el.removeAttribute('data-mashq-done'); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-mashq-jargon]'), function (span) { span.parentNode.replaceChild(document.createTextNode(span.textContent), span); });
    host.remove(); state.fields = []; state.marks = [];
  };
  document.addEventListener('focusin', focus); document.addEventListener('click', tap); document.addEventListener('keydown', tap);
  scan(); observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['required', 'aria-required', 'hidden', 'class', 'style', 'type', 'autocomplete', 'name', 'id', 'disabled'] });
})();
true;
