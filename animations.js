// v4
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
    '.pic::before, .pic::after { content: none !important; display: none !important; filter: none !important; opacity: 0 !important; }'
  ].join(' ');
  document.head.appendChild(s);
})();

// ── Inject wave divs that Froala keeps stripping ──
(function(){
  function injectWave(afterSelector, waveClass){
    var target = document.querySelector(afterSelector);
    if(!target) return;
    if(target.nextElementSibling && target.nextElementSibling.classList.contains(waveClass)) return;
    var wave = document.createElement('div');
    wave.className = 'tcl-wave ' + waveClass;
    target.parentNode.insertBefore(wave, target.nextSibling);
  }
  injectWave('.tcl-section-navy', 'tcl-wave-navy-orange');
  injectWave('.tcl-realestate', 'tcl-wave-orange-teal');
})();

/* ── /join + /book-a-call enhancements (v5) ─────────────────
   On /join (.tclj): wave dividers, billing toggle, FAQ accordion.
   On /book-a-call (.tclb): wave divider + booking iframe injection
   (Froala strips iframes, so the embed must be added by JS).
   Each block runs only when its wrapper exists — zero effect elsewhere. */
(function () {
  var join = document.querySelector('.tclj');
  if (!join) return;

  /* 1 — Waves */
  function injectJoinWave(sel, waveClass) {
    var t = join.querySelector(sel);
    if (!t) return;
    var next = t.nextElementSibling;
    if (next && next.classList.contains(waveClass)) return; /* no doubles */
    var w = document.createElement('div');
    w.className = 'tcl-wave ' + waveClass;
    t.insertAdjacentElement('afterend', w);
  }
  injectJoinWave('.tclj-grid',    'tcl-wave-white-sand');
  injectJoinWave('.tclj-tiers',   'tcl-wave-sand-navy');
  injectJoinWave('.tclj-partner', 'tcl-wave-navy-white');
  injectJoinWave('.tclj-faq',     'tcl-wave-white-navy');

  /* 2 — Billing toggle (anchors, class-keyed — no data attrs) */
  var tabs = join.querySelectorAll('.tclj-tb');
  Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      var monthly = tab.classList.contains('tclj-tb-monthly');
      join.classList.toggle('is-monthly', monthly);
      Array.prototype.forEach.call(tabs, function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
    });
  });

  /* 3 — FAQ accordion: collapse all but the first */
  var items = join.querySelectorAll('.tclj-faq-item');
  Array.prototype.forEach.call(items, function (item, i) {
    if (i > 0) item.classList.add('is-collapsed');
    var q = item.querySelector('.tclj-faq-q');
    if (q) {
      q.addEventListener('click', function () {
        item.classList.toggle('is-collapsed');
      });
    }
  });
})();

/* ── /book-a-call page (v5) ── */
(function () {
  var book = document.querySelector('.tclb');
  if (!book) return;

  /* Wave under the navy hero */
  var hero = book.querySelector('.tclb-hero');
  if (hero && !(hero.nextElementSibling && hero.nextElementSibling.classList.contains('tcl-wave-navy-white'))) {
    var w = document.createElement('div');
    w.className = 'tcl-wave tcl-wave-navy-white';
    hero.insertAdjacentElement('afterend', w);
  }

  /* Inject the GHL booking iframe (Froala strips iframes from the editor) */
  var slot = book.querySelector('.tclb-widget');
  if (slot && !slot.querySelector('iframe')) {
    var f = document.createElement('iframe');
    f.src = 'https://link.geckonaut.com/widget/bookings/livethecelebrationlife';
    f.title = 'Book a Call — The Celebration Life';
    f.setAttribute('loading', 'lazy');
    f.setAttribute('scrolling', 'yes');
    f.addEventListener('load', function () {
      var loading = slot.querySelector('.tclb-loading');
      if (loading) loading.style.display = 'none';
    });
    slot.appendChild(f);
  }
})();
