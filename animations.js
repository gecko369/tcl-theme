/* ============================================================
   The Celebration Life — animations.js
   Served via: https://gecko369.github.io/tcl-theme/animations.js
   Phase 9: Scroll animations, parallax, Swiper, Sunni UI
   ============================================================ */

// ── Page loader (sun spinning on navy) ──
(function(){
  var loader = document.createElement('div');
  loader.id = 'tcl-loader';
  loader.innerHTML = '<div class="tcl-loader-sun"></div><p class="tcl-loader-tag">It\'s Always Sunny in Celebration.</p>';
  document.body.insertBefore(loader, document.body.firstChild);

  var s = document.createElement('style');
  s.textContent = `
    #tcl-loader {
      position: fixed; inset: 0; z-index: 999999;
      background: #0D3347;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 28px;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    #tcl-loader.tcl-loader-gone { opacity: 0; visibility: hidden; }
    .tcl-loader-sun {
      width: 80px; height: 80px; border-radius: 50%;
      background: conic-gradient(from 0deg, #FFCA08, #F58220, #15C4AF, #FFCA08);
      box-shadow: 0 0 50px rgba(255,202,8,0.5);
      animation: tclSpin 1.2s linear infinite;
    }
    @keyframes tclSpin { to { transform: rotate(360deg); } }
    .tcl-loader-tag {
      font-family: 'Caveat', cursive; font-size: 1.6rem;
      color: #FFCA08; margin: 0; letter-spacing: 0.02em;
    }
  `;
  document.head.appendChild(s);

  function dismiss(){
    var el = document.getElementById('tcl-loader');
    if(el){ el.classList.add('tcl-loader-gone'); setTimeout(function(){ if(el.parentNode){ el.parentNode.removeChild(el); } }, 550); }
  }
  window.addEventListener('load', dismiss);
  setTimeout(dismiss, 3000); // failsafe — never blocks more than 3s
})();

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

