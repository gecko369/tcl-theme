/* ============================================================
   The Celebration Life — animations.js
   Served via: https://gecko369.github.io/tcl-theme/animations.js
   Phase 9: Scroll animations, parallax, Swiper, Sunni UI
   ============================================================ */

/* ── Loader background: navy only on first PWA launch ─────── */
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
const isFirstLaunch = !sessionStorage.getItem('tcl_launched');
const loader = document.getElementById('tcl-loader');

if (loader) {
  if (isStandalone && isFirstLaunch) {
    loader.style.background = '#0D3347';
    sessionStorage.setItem('tcl_launched', '1');
  } else {
    loader.style.background = 'transparent';
  }
}

(function(){
  var s = document.createElement('style');
  s.textContent = [
    // Related posts blurred backdrop fix
    '.related-post-image::before, .related-post-image::after { content: none !important; display: none !important; filter: none !important; opacity: 0 !important; }',
    '.related-post-image { overflow: hidden !important; background-size: cover !important; background-position: center center !important; }',
    '.related-post-image img { width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: center center !important; display: block !important; position: relative !important; z-index: 1 !important; }',
    // .pic homepage cards (belt and suspenders)
    '.pic { background-size: cover !important; background-position: center center !important; overflow: hidden !important; }',
    '.pic::before, .pic::after { content: none !important; display: none !important; filter: none !important; opacity: 0 !important; }'
  ].join(' ');
  document.head.appendChild(s);
})();

window.addEventListener('load', () => {
  document.getElementById('tcl-loader')?.classList.add('done');
});
