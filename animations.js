// v2
/* ============================================================
   The Celebration Life — animations.js
   Served via: https://gecko369.github.io/tcl-theme/animations.js
   Phase 9: Scroll animations, parallax, Swiper, Sunni UI
   ============================================================ */


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

// ── Inject wave divs that Froala keeps stripping ──
(function(){
  function injectWave(afterSelector, waveClass){
    var target = document.querySelector(afterSelector);
    if(!target) return;
    // Don't double-inject
    if(target.nextElementSibling && target.nextElementSibling.classList.contains(waveClass)) return;
    var wave = document.createElement('div');
    wave.className = 'tcl-wave ' + waveClass;
    target.parentNode.insertBefore(wave, target.nextSibling);
  }
  injectWave('.tcl-section-navy', 'tcl-wave-navy-orange');
  injectWave('.tcl-realestate', 'tcl-wave-orange-teal');
})();

