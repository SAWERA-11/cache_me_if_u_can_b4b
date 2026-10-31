// Practice page for the Guide: a ride-booking flow with a fictional brand (no real app names or logos).
// Owner: Maaz (src/forms). Do not put backticks or dollar-brace in the HTML.
export const RIDE_FORM_HTML = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ride Practice</title>
<style>
body{margin:0;font-family:Arial,Helvetica,sans-serif;font-size:20px;color:#111;background:#f4f4f2;}
.top{background:#1d3557;color:#fff;padding:14px 16px;font-size:22px;font-weight:bold;}
.practice{background:#fff4e0;color:#7a4b00;padding:10px 16px;font-size:18px;border-bottom:2px solid #e6c27a;}
.wrap{padding:16px;}
h2{font-size:24px;margin:8px 0 12px;}
label{display:block;margin:14px 0 6px;font-weight:bold;}
.req{color:#c00;}
input[type=text],input[type=tel],select{width:100%;box-sizing:border-box;font-size:20px;padding:14px;border:2px solid #555;border-radius:8px;background:#fff;}
button{font-size:20px;min-height:56px;padding:12px 18px;border-radius:10px;border:2px solid #111;background:#fff;color:#111;margin:8px 8px 0 0;}
button.primary{background:#1d3557;color:#fff;border-color:#1d3557;}
.err{color:#c00;font-size:18px;margin-top:6px;min-height:22px;}
.map{display:block;border:2px solid #bbb;border-radius:10px;margin:8px 0;}
.card{display:block;border:2px solid #555;border-radius:10px;padding:14px;margin:8px 0;background:#fff;font-weight:normal;}
.card input{margin-right:12px;transform:scale(1.5);}
.sugg{border:2px solid #bbb;border-radius:8px;background:#fff;display:none;}
.sugg div{padding:14px;border-bottom:1px solid #ddd;}
.tag{display:inline-block;background:#ffe08a;padding:2px 10px;border-radius:6px;font-size:17px;}
.step{display:none;}
.step.on{display:block;}
.banner{background:#fde8e8;color:#a00;padding:12px;border-radius:8px;margin:10px 0;display:none;font-size:18px;}
.modal{position:fixed;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:50;}
.modal .box{background:#fff;border-radius:12px;padding:20px;width:84%;}
.sum{background:#fff;border:2px solid #bbb;border-radius:10px;padding:12px;margin:8px 0;line-height:1.6;}
.ok{background:#e8f3ec;border:2px solid #7bb38a;border-radius:10px;padding:14px;margin:8px 0;}
</style>
</head>
<body>
<div class="top">Ride Practice</div>
<div class="practice">Practice page. Nothing here is real. No ride will be booked.</div>
<div class="wrap">

<div id="session" class="banner">Session expired. Please log in again. <button type="button" id="relog">Log in again</button></div>

<section class="step on" id="s1">
  <h2>Where are you?</h2>
  <svg class="map" viewBox="0 0 300 150" width="100%" height="150" role="img" aria-label="Map (practice)">
    <rect width="300" height="150" fill="#e8e8e3"/>
    <path d="M0 100 L300 60" stroke="#ffffff" stroke-width="14" fill="none"/>
    <path d="M80 0 L120 150" stroke="#ffffff" stroke-width="10" fill="none"/>
    <circle cx="150" cy="80" r="10" fill="#1d3557"/>
    <text x="8" y="16" font-size="12" fill="#555">Map (practice)</text>
  </svg>
  <label for="pickup">Pickup point <span class="req">*</span></label>
  <input type="text" required id="pickup" name="pickup" placeholder="Type your pickup point">
  <button type="button" id="useloc">Use my location</button>
  <div class="err" id="e1"></div>
  <div><button type="button" class="primary" id="n1">Next</button></div>
</section>

<section class="step" id="s2">
  <h2>Where to?</h2>
  <label for="drop">Drop-off point <span class="req">*</span></label>
  <input type="text" required id="drop" name="dropoff" placeholder="Type a place">
  <div class="sugg" id="sugg"></div>
  <div class="err" id="e2"></div>
  <div><button type="button" id="b2">Back</button><button type="button" class="primary" id="n2">Next</button></div>
</section>

<section class="step" id="s3">
  <h2>Choose a ride</h2>
  <div><span class="tag">Surge pricing x1.3</span></div>
  <label class="card"><input type="radio" name="ride" value="bike" required> Bike: Rs 180 &middot; ETA 4 min</label>
  <label class="card"><input type="radio" name="ride" value="rickshaw" required> Rickshaw: Rs 260 &middot; ETA 6 min</label>
  <label class="card"><input type="radio" name="ride" value="car" required> Car: Rs 450 &middot; ETA 5 min</label>
  <label class="card"><input type="radio" name="ride" value="carac" required> Car AC: Rs 520 &middot; ETA 8 min</label>
  <div class="err" id="e3"></div>
  <div><button type="button" id="b3">Back</button><button type="button" class="primary" id="n3">Next</button></div>
</section>

<section class="step" id="s4">
  <h2>Your fare</h2>
  <p>Suggested fare: <b id="sug">Rs 450</b></p>
  <label for="fare">Your offer in Rs <span class="req">*</span></label>
  <input type="text" inputmode="numeric" required id="fare" name="fare" placeholder="For example 450">
  <div class="err" id="e4"></div>
  <div><button type="button" id="b4">Back</button><button type="button" class="primary" id="n4">Next</button></div>
</section>

<section class="step" id="s5">
  <h2>Payment and contact</h2>
  <label for="pay">Payment method <span class="req">*</span></label>
  <select required id="pay" name="pay"><option value="">Select</option><option value="cash">Cash</option><option value="wallet">Wallet</option></select>
  <label for="phone">Mobile number <span class="req">*</span></label>
  <input type="tel" required id="phone" name="phone" placeholder="03XX-XXXXXXX">
  <label class="card"><input type="checkbox" id="share" name="share"> Share trip with a family member</label>
  <div class="err" id="e5"></div>
  <div><button type="button" id="b5">Back</button><button type="button" class="primary" id="n5">Next</button></div>
</section>

<section class="step" id="s6">
  <h2>Check and request</h2>
  <div class="sum" id="summary"></div>
  <div class="banner" id="e6">Something went wrong. Please try again.</div>
  <div id="finding" style="display:none;">Finding a driver...</div>
  <div><button type="button" id="b6">Back</button><button type="button" class="primary" id="go">Request ride</button></div>
</section>

<section class="step" id="s7">
  <h2>Driver found</h2>
  <div class="ok"><b>Driver Imran (practice)</b><br>Plate: ABC-123 (practice)<br>Arriving in 4 min</div>
  <div class="sum">Before you sit: check that the plate number matches.<br>Share your trip with someone you trust.</div>
  <div><button type="button" class="primary" id="again">Practise again</button></div>
</section>

</div>

<div class="modal" id="modal"><div class="box">
  <p>Allow Ride Practice to use your location?</p>
  <button type="button" class="primary" id="allow">Allow</button>
  <button type="button" id="deny">Don't allow</button>
</div></div>

<script>
(function () {
  var PLACES = ["Clifton Block 5", "Saddar", "Gulshan-e-Iqbal", "Karachi Airport", "City Mall", "Defence Phase 6"];
  var FARES = { bike: 180, rickshaw: 260, car: 450, carac: 520 };
  var failedOnce = false;
  var current = 1;

  function $(id) { return document.getElementById(id); }
  function show(n) {
    for (var i = 1; i <= 7; i++) { $("s" + i).className = "step" + (i === n ? " on" : ""); }
    current = n;
    if (n === 6) { summarize(); }
    window.scrollTo(0, 0);
  }
  function val(id) { return $(id).value.replace(/^\s+|\s+$/g, ""); }
  function ride() {
    var r = document.getElementsByName("ride");
    for (var i = 0; i < r.length; i++) { if (r[i].checked) { return r[i].value; } }
    return "";
  }
  function summarize() {
    var r = ride();
    $("summary").textContent = "Pickup: " + val("pickup") + " | Drop-off: " + val("drop") + " | Ride: " + r + " | Offer: Rs " + val("fare") + " | Pay: " + $("pay").value;
  }

  $("useloc").onclick = function () { $("modal").style.display = "flex"; };
  $("allow").onclick = function () { $("modal").style.display = "none"; $("pickup").value = "Current location (practice)"; $("e1").textContent = ""; };
  $("deny").onclick = function () { $("modal").style.display = "none"; $("e1").textContent = "Location error"; };
  $("n1").onclick = function () { if (!val("pickup")) { $("e1").textContent = "Required field"; return; } $("e1").textContent = ""; show(2); };

  $("drop").oninput = function () {
    var q = val("drop").toLowerCase(), box = $("sugg"), out = [], i;
    box.innerHTML = "";
    if (!q) { box.style.display = "none"; $("e2").textContent = ""; return; }
    for (i = 0; i < PLACES.length; i++) { if (PLACES[i].toLowerCase().indexOf(q) > -1) { out.push(PLACES[i]); } }
    if (!out.length) { box.style.display = "none"; $("e2").textContent = "No results"; return; }
    $("e2").textContent = "";
    for (i = 0; i < out.length; i++) {
      var d = document.createElement("div");
      d.textContent = out[i];
      d.onclick = function () { $("drop").value = this.textContent; box.style.display = "none"; };
      box.appendChild(d);
    }
    box.style.display = "block";
  };
  $("b2").onclick = function () { show(1); };
  $("n2").onclick = function () { if (!val("drop")) { $("e2").textContent = "Required field"; return; } $("e2").textContent = ""; show(3); };

  $("b3").onclick = function () { show(2); };
  $("n3").onclick = function () {
    var r = ride();
    if (!r) { $("e3").textContent = "Required field"; return; }
    $("e3").textContent = ""; $("sug").textContent = "Rs " + FARES[r]; show(4);
  };

  $("b4").onclick = function () { show(3); };
  $("n4").onclick = function () {
    var f = parseInt(val("fare"), 10), s = FARES[ride()] || 450;
    if (isNaN(f) || f < Math.round(s * 0.7)) { $("e4").textContent = "Invalid offer"; return; }
    $("e4").textContent = ""; show(5);
  };

  $("b5").onclick = function () { show(4); };
  $("n5").onclick = function () {
    if (!$("pay").value) { $("e5").textContent = "Required field"; return; }
    if (!/^03\d{2}-?\d{7}$/.test(val("phone"))) { $("e5").textContent = "Invalid input"; return; }
    $("e5").textContent = ""; show(6);
  };

  $("b6").onclick = function () { show(5); };
  $("go").onclick = function () {
    if (!failedOnce) { failedOnce = true; $("e6").style.display = "block"; return; }
    $("e6").style.display = "none"; $("finding").style.display = "block";
    setTimeout(function () { $("finding").style.display = "none"; show(7); }, 1200);
  };
  $("again").onclick = function () { failedOnce = false; $("pickup").value = ""; $("drop").value = ""; $("fare").value = ""; show(1); };

  setTimeout(function () { $("session").style.display = "block"; }, 60000);
  $("relog").onclick = function () { $("session").style.display = "none"; };
})();
</script>
</body>
</html>
`;
