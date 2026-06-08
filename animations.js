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

window.addEventListener('load', () => {
  document.getElementById('tcl-loader')?.classList.add('done');
});
