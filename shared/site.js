/* =============================================================
   SHARED SITE DATA — loaded by index.html and every versions/*.html
   This is the ONLY place that needs editing when a new version ships.
   Add one entry to VERSIONS below; nothing else needs to change.
   ============================================================= */

var VERSIONS = [
  {
    version: "v1.0",
    date: "2026-07-06",
    file: "versions/v1.0.html",
    summary: "Greyscale/monochrome theme, compact spacing, dropdown filters, 2-page pagination, rebuilt client detail modal (top nav w/ prev-next + breadcrumb + client switcher on hover over name), full Financial Plan Dashboard content.",
    commentsUrl: "" /* paste a GitHub Discussion (or commit) link here once this version is pushed */
  }
];

/* =============================================================
   ACCESS GATE
   Client-side only — this is NOT real security. The password below
   is readable by anyone who views page source. It only deters casual
   link-following, not a determined visitor. For real access control,
   put Cloudflare Access (free) in front of the GitHub Pages site instead.

   To change the password: replace GATE_PW_B64 with the base64 of the
   new password, e.g. run btoa("newpassword") in any browser console
   and paste the result below.
   ============================================================= */
var GATE_PW_B64 = "RmluY2FydDIwMjY="; // btoa("Fincart2026")

function siteInitGate(){
  var wall = document.getElementById('gatewall');
  var root = document.getElementById('appRoot');
  if(!wall || !root) return;

  if(sessionStorage.getItem('fincartGateOk') === '1'){
    wall.style.display = 'none';
    root.classList.remove('gated-hidden');
  }

  window.checkGate = function(){
    var input = document.getElementById('gatepw');
    var err = document.getElementById('gateerr');
    if(btoa(input.value) === GATE_PW_B64){
      sessionStorage.setItem('fincartGateOk', '1');
      wall.style.display = 'none';
      root.classList.remove('gated-hidden');
    } else {
      err.style.opacity = '1';
      input.value = '';
      input.focus();
    }
  };

  var pwInput = document.getElementById('gatepw');
  if(pwInput){
    pwInput.addEventListener('keydown', function(e){ if(e.key === 'Enter') window.checkGate(); });
    pwInput.focus();
  }
}

/* =============================================================
   VERSION SWITCHER — small "vX.X ▾" control embedded in each
   prototype snapshot's topbar, linking across all versions + back
   to the version picker (index.html).
   basePathPrefix: "" when called from root index.html, "../" when
   called from inside /versions/*.html
   ============================================================= */
function siteRenderVersionSwitch(containerId, currentVersion, basePathPrefix){
  var el = document.getElementById(containerId);
  if(!el) return;
  var ordered = VERSIONS.slice().reverse();
  var items = ordered.map(function(v){
    return '<a class="vswitem'+(v.version===currentVersion?' cur':'')+'" href="'+basePathPrefix+v.file+'">'+v.version+' — '+v.date+'</a>';
  }).join('');
  el.innerHTML =
    '<div class="vsw">'+
      '<div class="vswbtn" onclick="event.stopPropagation();siteToggleVersionMenu()">'+currentVersion+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></div>'+
      '<div class="vswmenu" id="vswmenu">'+items+
        '<a class="vswitem all" href="'+basePathPrefix+'index.html">All versions →</a>'+
      '</div>'+
    '</div>';
}
function siteToggleVersionMenu(){
  var m = document.getElementById('vswmenu');
  if(m) m.classList.toggle('show');
}
document.addEventListener('click', function(e){
  if(!e.target.closest('.vsw')){ var m=document.getElementById('vswmenu'); if(m) m.classList.remove('show'); }
});
