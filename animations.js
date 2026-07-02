// v8
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

/* ── /join + /book-a-call enhancements (v6) ─────────────────
   On /join (.tclj): wave dividers, billing toggle, FAQ accordion.
   On /book-a-call (.tclb): wave divider + booking iframe injection
   (Froala strips iframes, so the embed must be added by JS).
   Each block runs only when its wrapper exists — zero effect elsewhere. */
(function () {
  var join = document.querySelector('.tclj');
  if (!join) return;

  /* Smooth scrolling for the in-page anchors — set here so it only
     ever applies on /join (no global CSS rule) */
  document.documentElement.style.scrollBehavior = 'smooth';

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

/* ── /book-a-call page (v6) ── */
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

/* ── HOMEPAGE MERCH SLIDER (m4) ──────────────────────────────
   Self-contained carousel for the .tclm section. Runs ONLY when
   .tclm exists, and only ever touches elements INSIDE .tclm (plus
   the two waves it adds). No jQuery, no slick, no global state —
   cannot interfere with any other slider on the page.

   ★ PRODUCTS LIVE HERE ★  To add a product, add its Sticker Mule
   item ID to this array and push. To remove one, delete its line.
   Order in the array = order in the slider. That is the only edit
   you ever need — the BD page snippet never changes again. */
(function () {
  var tclmProducts = [
    '20642513',
    '20640580',
    '20642515',
    '20642517',
    '20640715',
    '20642520',
    '20642512',
    '20642514',
    '20640406',
    '20642516',
    '20642521',
    '20642510',
    '20642519',
    '20640724',
    '20642518',
    '20642522'
  ];

  var root = document.querySelector('.tclm');
  if (!root) return;

  var track = root.querySelector('.tclm-track');
  if (!track) return;

  /* Build the slides from the product array (skips if already built) */
  if (!track.querySelector('.tclm-slide')) {
    for (var p = 0; p < tclmProducts.length; p++) {
      var slide = document.createElement('div');
      slide.className = 'tclm-slide';
      var f = document.createElement('iframe');
      f.className = 'tclm-frame';
      f.src = 'https://www.stickermule.com/embed/item/' + tclmProducts[p];
      f.setAttribute('allowtransparency', 'true');
      f.setAttribute('frameborder', '0');
      f.setAttribute('loading', 'lazy');
      f.setAttribute('scrolling', 'no');
      f.setAttribute('title', 'Celebration Life merch');
      slide.appendChild(f);
      track.appendChild(slide);
    }
  }
  var slides = track.querySelectorAll('.tclm-slide');
  if (!slides.length) return;

  /* ── Waves bracketing the section ──────────────────────────
     The homepage's existing IIFE injects an orange->teal wave right
     after .tcl-realestate. Since the white merch section now sits
     between orange and teal, we (a) remove that stray wave if it
     landed directly before us, and (b) add an orange->white wave on
     top and a white->teal wave on the bottom. Removing this whole
     IIFE restores the original behavior automatically. */
  (function () {
    var before = root.previousElementSibling;
    if (before && before.classList &&
        before.classList.contains('tcl-wave-orange-teal')) {
      before.parentNode.removeChild(before);
    }
    if (!(root.previousElementSibling &&
          root.previousElementSibling.classList.contains('tcl-wave-orange-white'))) {
      var top = document.createElement('div');
      top.className = 'tcl-wave tcl-wave-orange-white';
      root.parentNode.insertBefore(top, root);
    }
    if (!(root.nextElementSibling &&
          root.nextElementSibling.classList.contains('tcl-wave-white-teal'))) {
      var bot = document.createElement('div');
      bot.className = 'tcl-wave tcl-wave-white-teal';
      if (root.nextSibling) root.parentNode.insertBefore(bot, root.nextSibling);
      else root.parentNode.appendChild(bot);
    }
    root.classList.add('tclm-has-waves');
  })();

  var count   = slides.length;
  var index   = 0;
  var timer   = null;
  var dotsBox = root.querySelector('.tclm-dots');
  var dots    = [];

  if (dotsBox) {
    for (var i = 0; i < count; i++) {
      (function (i) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'tclm-dot' + (i === 0 ? ' is-active' : '');
        d.setAttribute('aria-label', 'Go to product ' + (i + 1));
        d.addEventListener('click', function () { go(i); restart(); });
        dotsBox.appendChild(d);
        dots.push(d);
      })(i);
    }
  }

  function go(n) {
    index = (n % count + count) % count;
    track.style.transform = 'translateX(' + (-index * 100) + '%)';
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('is-active', i === index);
    }
  }
  function next() { go(index + 1); }
  function prev() { go(index - 1); }
  function start() { if (count > 1 && !timer) timer = setInterval(next, 5000); }
  function stop()  { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  var nextBtn = root.querySelector('.tclm-next');
  var prevBtn = root.querySelector('.tclm-prev');
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });

  var slider = root.querySelector('.tclm-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
  }

  go(0);
  start();
})();

/* ── HOMEPAGE BUSINESS CTA BAND (b2) ─────────────────────────
   Sits directly UNDER the "Wear the Sunshine" merch section and
   ABOVE the teal newsletter section. Adds a white->navy wave on top
   and a navy->teal wave on the bottom, and neutralizes the merch
   section's own white->teal bottom wave (which would otherwise land
   between the white merch section and this navy band).

   Runs ONLY when .tclb-cta exists; only touches this band and the
   waves around it. No jQuery/slick, no global state. Removing this
   IIFE fully reverts — the merch section recreates its own
   white->teal wave on the next load. */
(function () {
  var band = document.querySelector('.tclb-cta');
  if (!band) return;

  /* Remove the wave the merch section injected directly above us
     (its white->teal wave) so it doesn't strand against the navy band. */
  var before = band.previousElementSibling;
  if (before && before.classList && before.classList.contains('tcl-wave') &&
      !before.classList.contains('tcl-wave-white-navy-b')) {
    before.parentNode.removeChild(before);
  }

  /* Top wave: white merch -> navy band */
  if (!(band.previousElementSibling &&
        band.previousElementSibling.classList.contains('tcl-wave-white-navy-b'))) {
    var top = document.createElement('div');
    top.className = 'tcl-wave tcl-wave-white-navy-b';
    band.parentNode.insertBefore(top, band);
  }

  /* Bottom wave: navy band -> teal newsletter */
  if (!(band.nextElementSibling &&
        band.nextElementSibling.classList.contains('tcl-wave-navy-teal-b'))) {
    var bot = document.createElement('div');
    bot.className = 'tcl-wave tcl-wave-navy-teal-b';
    if (band.nextSibling) band.parentNode.insertBefore(bot, band.nextSibling);
    else band.parentNode.appendChild(bot);
  }
})();


/* ── THE LOOP newsletter (loop1) ─────────────────────────────
   1. Loads GHL's form_embed.js once (so individual BD widgets
      don't each include it).
   2. Injects the GHL form iframe into any .tcl-loop__form
      placeholder on the page (Froala strips iframes from BD
      widget HTML, so the iframe must be added here).
   Each .tcl-loop__form carries data-ghl-form (the form id) and an
   optional data-ghl-suffix to keep two embeds on one page distinct.
   Runs only when a .tcl-loop exists; touches nothing else. */
(function () {
  var loops = document.querySelectorAll('.tcl-loop__form');
  if (!loops.length) return;

  /* 1 — load GHL embed script once */
  if (!document.querySelector('script[src*="link.geckonaut.com/js/form_embed.js"]')) {
    var s = document.createElement('script');
    s.src = 'https://link.geckonaut.com/js/form_embed.js';
    s.async = true;
    document.body.appendChild(s);
  }

  /* 2 — inject an iframe into each placeholder that doesn't have one */
  Array.prototype.forEach.call(loops, function (slot) {
    if (slot.querySelector('iframe')) return;
    var formId = slot.getAttribute('data-ghl-form');
    if (!formId) return;
    var suffix = slot.getAttribute('data-ghl-suffix') || '';
    var frameId = 'inline-' + formId + suffix;

    var f = document.createElement('iframe');
    f.src = 'https://link.geckonaut.com/widget/form/' + formId;
    f.style.width = '100%';
    f.style.border = 'none';
    f.id = frameId;
    f.setAttribute('data-layout', "{'id':'INLINE'}");
    f.setAttribute('data-trigger-type', 'alwaysShow');
    f.setAttribute('data-trigger-value', '');
    f.setAttribute('data-activation-type', 'alwaysActivated');
    f.setAttribute('data-activation-value', '');
    f.setAttribute('data-deactivation-type', 'neverDeactivate');
    f.setAttribute('data-deactivation-value', '');
    f.setAttribute('data-form-name', 'CL SITE NEWSLETTER SIGN UP');
    f.setAttribute('data-height', '434');
    f.setAttribute('data-layout-iframe-id', frameId);
    f.setAttribute('data-form-id', formId);
    f.setAttribute('title', 'CL SITE NEWSLETTER SIGN UP');
    slot.appendChild(f);
  });
})();
/* ── VIDEO LANDERS (vl1) ─────────────────────────────────────
   1. Injects a video iframe into any .tclv-screen that has a
      non-empty data-tclv-video attribute (and hides its placeholder
      overlay). Empty/absent attribute = glowing placeholder stays.
   2. On the offer page (.tclvp-offer), injects the GHL booking
      calendar iframe into .tclvp-cal and loads GHL's embed script.
   Froala strips iframes, so both must be added by JS. Runs only when
   the relevant elements exist; touches nothing else. */
(function () {
  /* 1 — video holders */
var screens = document.querySelectorAll('.tclv-screen[data-tclv-video]');
Array.prototype.forEach.call(screens, function (sc) {
  var url = (sc.getAttribute('data-tclv-video') || '').trim();
  if (!url || sc.querySelector('iframe') || sc.querySelector('video')) return;

  var ov  = sc.querySelector('.tclv-overlay');
  var lbl = sc.querySelector('.tclv-label') || sc.parentNode.querySelector('.tclv-label');
  var isFile = /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(url);

  if (isFile) {
    /* Direct file → native HTML5 video, keep click-to-play overlay */
    var v = document.createElement('video');
    v.src = url + '#t=0.001';
    v.controls = true;
    v.playsInline = true;
    v.preload = 'metadata';
    var poster = (sc.getAttribute('data-tclv-poster') || '').trim();
    if (poster) v.poster = poster;
    v.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;' +
                      'object-fit:contain;background:#000;border-radius:inherit;display:block;z-index:1;';
    if (getComputedStyle(sc).position === 'static') sc.style.position = 'relative';
    sc.appendChild(v);

    var start = function () {
      if (ov)  ov.style.display  = 'none';
      v.play();
    };

    if (ov) {
      ov.style.position = 'absolute';
      ov.style.top = '0'; ov.style.left = '0';
      ov.style.width = '100%'; ov.style.height = '100%';
      ov.style.zIndex = '3';
      ov.style.cursor = 'pointer';
      ov.addEventListener('click', start);
    }
    if (lbl) lbl.style.display = 'none';
  } else {
    /* Embed URL (YouTube/Vimeo/etc.) → iframe, original behavior */
    var f = document.createElement('iframe');
    f.src = url;
    f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('loading', 'lazy');
    f.setAttribute('title', 'Video');
    if (ov)  ov.style.display  = 'none';
    if (lbl) lbl.style.display = 'none';
    sc.appendChild(f);
  }
});

  /* 2 — offer page booking calendar */
  var slot = document.querySelector('.tclvp-offer .tclvp-cal');
  if (slot && !slot.querySelector('iframe')) {
    if (!document.querySelector('script[src*="link.geckonaut.com/js/form_embed.js"]')) {
      var s = document.createElement('script');
      s.src = 'https://link.geckonaut.com/js/form_embed.js';
      s.async = true;
      document.body.appendChild(s);
    }
    var cf = document.createElement('iframe');
    cf.src = 'https://link.geckonaut.com/widget/booking/NnwajOjtUTvbw4OkMqhm';
    cf.style.width = '100%';
    cf.style.border = 'none';
    cf.style.overflow = 'hidden';
    cf.setAttribute('scrolling', 'no');
    cf.id = 'tclvp-booking';
    var loading = slot.querySelector('.tclvp-cal-loading');
    if (loading) loading.style.display = 'none';
    slot.appendChild(cf);
  }
})();
/* ── GUIDE LANDERS (gl1) ─────────────────────────────────────
   Injects the GHL "CL Guide Sign Up" form into any .tclgd-form
   placeholder, pre-filling the hidden guide_requested field from
   the lander's data-guide attribute. Froala strips iframes, so the
   form must be injected here. Runs only when a .tclgd-form exists. */
(function () {
  var slots = document.querySelectorAll('.tclgd-form[data-guide]');
  if (!slots.length) return;
  var FORM_ID = 'RaXLw3gMkshHMYBlYi2n';
  if (!document.querySelector('script[src*="link.geckonaut.com/js/form_embed.js"]')) {
    var s = document.createElement('script');
    s.src = 'https://link.geckonaut.com/js/form_embed.js';
    s.async = true;
    document.body.appendChild(s);
  }
  Array.prototype.forEach.call(slots, function (slot) {
    if (slot.querySelector('iframe')) return;
    var guide = (slot.getAttribute('data-guide') || '').trim();
    var src = 'https://link.geckonaut.com/widget/form/' + FORM_ID;
    if (guide) src += '?guide_requested=' + encodeURIComponent(guide);
    var f = document.createElement('iframe');
    f.src = src;
    f.style.width = '100%';
    f.style.border = 'none';
    f.style.borderRadius = '10px';
    f.id = 'inline-' + FORM_ID + (guide ? '-' + guide : '');
    f.setAttribute('data-layout', "{'id':'INLINE'}");
    f.setAttribute('data-form-id', FORM_ID);
    f.setAttribute('data-form-name', 'CL Guide Sign Up');
    f.setAttribute('title', 'CL Guide Sign Up');
    var loading = slot.querySelector('.tclgd-form-loading');
    if (loading) loading.style.display = 'none';
    slot.appendChild(f);
  });
})();
