/* ═══════════════════════════════════════════════════
   InterioRossi — main.js
   Header · Slider · Carousel · Process · Forms · Modal
═══════════════════════════════════════════════════ */

'use strict';

// ─── Config ───────────────────────────────────────
const API_BASE = '/api';  // backend endpoint (will be set on deploy)

// ─── Utility ──────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

// ─── 1. Header scroll ─────────────────────────────
(function initHeader() {
  const header = $('#header');
  if (!header) return;

  const update = () => header.classList.toggle('scrolled', window.scrollY > 40);
  update();
  on(window, 'scroll', update, { passive: true });
})();

// ─── 2. Mobile menu ───────────────────────────────
(function initMobileMenu() {
  const burger = $('#burger');
  const menu   = $('#mobileMenu');
  if (!burger || !menu) return;

  const toggle = (open) => {
    burger.classList.toggle('active', open);
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  on(burger, 'click', () => toggle(!menu.classList.contains('open')));

  // Close on nav-link click
  $$('.nav-link', menu).forEach(link =>
    on(link, 'click', () => toggle(false))
  );

  // Mobile catalog accordion
  const mobCatToggle = $('#mobCatalogToggle');
  const mobCatList   = $('#mobCatalogList');
  if (mobCatToggle && mobCatList) {
    const mobCatParent = mobCatToggle.closest('.mob-catalog-toggle');
    on(mobCatToggle, 'click', () => {
      const isOpen = mobCatParent.classList.toggle('open');
      mobCatList.classList.toggle('open', isOpen);
      mobCatToggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close menu when a catalog link is clicked
    $$('a', mobCatList).forEach(link => on(link, 'click', () => toggle(false)));
  }

  // Close on Escape
  on(document, 'keydown', e => { if (e.key === 'Escape') toggle(false); });
})();

// ─── 2a. Catalog mega-menu ────────────────────────
(function initCatalogMenu() {
  const wrap    = $('#catalogWrap');
  const btn     = $('#catalogBtn');
  const mega    = $('#catalogMega');
  const overlay = $('#catalogOverlay');
  if (!wrap || !btn || !mega) return;

  const open  = () => {
    mega.classList.add('open');
    overlay?.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    mega.classList.remove('open');
    overlay?.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };

  on(btn, 'click', () => mega.classList.contains('open') ? close() : open());
  on(overlay, 'click', () => close());

  // Close on outside click
  on(document, 'click', e => {
    if (!wrap.contains(e.target) && !mega.contains(e.target)) close();
  });

  // Close on Escape or when clicking a link inside mega
  on(document, 'keydown', e => { if (e.key === 'Escape') close(); });
  $$('a', mega).forEach(link => on(link, 'click', () => close()));
})();

// ─── 2b. "Клиенту" dropdown ───────────────────────
(function initClientDropdown() {
  const wrap = $('#hdrClient');
  const btn  = $('#hdrClientBtn');
  const menu = $('#hdrClientMenu');
  if (!wrap || !btn || !menu) return;

  const open  = () => { menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); };
  const close = () => { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };

  on(btn, 'click', () => menu.classList.contains('open') ? close() : open());

  on(document, 'click', e => { if (!wrap.contains(e.target)) close(); });
  on(document, 'keydown', e => { if (e.key === 'Escape') close(); });
})();

// ─── 2c. Header search clear ──────────────────────
(function initHdrSearch() {
  const form  = $('#hdrSearch');
  const input = $('#hdrSearchInput');
  const clear = $('#hdrSearchClear');
  if (!form || !input || !clear) return;

  on(input, 'input', () => form.classList.toggle('has-value', input.value.length > 0));
  on(clear, 'click', () => {
    input.value = '';
    form.classList.remove('has-value');
    input.focus();
  });
})();

// ─── 2d. Callback button ──────────────────────────
(function initCallback() {
  const btn = $('#hdrCallback');
  if (!btn) return;
  on(btn, 'click', () => {
    const target = document.querySelector('#contact');
    if (!target) return;
    const headerH = document.querySelector('#header')?.offsetHeight || 112;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

// ─── 3. Smooth scroll for anchor links ────────────
(function initSmoothScroll() {
  on(document, 'click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const headerH = document.querySelector('#header')?.offsetHeight || 112;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

// ─── 4. Hero slider ───────────────────────────────
(function initHeroSlider() {
  const slider = $('#heroSlider');
  if (!slider) return;

  const slides = $$('.hero-slide', slider);
  const dots   = $$('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  const go = (idx) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };

  const autoplay = () => { timer = setInterval(() => go(current + 1), 5000); };
  const reset    = () => { clearInterval(timer); autoplay(); };

  dots.forEach(dot => {
    on(dot, 'click', () => { go(+dot.dataset.slide); reset(); });
  });

  autoplay();
})();

// ─── 5. Counter animation (hero stats) ────────────
(function initCounters() {
  const nums = $$('[data-count]');
  if (!nums.length) return;

  const animate = (el) => {
    const target = +el.dataset.count;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const tick = () => {
      current = Math.min(current + increment, target);
      el.textContent = Math.round(current);
      if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
})();

// ─── 6. Cases carousel ────────────────────────────
(function initCasesCarousel() {
  const track   = $('#casesCarousel');
  const prevBtn = $('#casesPrev');
  const nextBtn = $('#casesNext');
  const dotsWrap = $('#casesDots');
  if (!track) return;

  const cards = $$('.case-card', track);
  let current = 0;
  let perView = getPerView();

  function getPerView() {
    if (window.innerWidth < 640)  return 1;
    if (window.innerWidth < 1000) return 2;
    return 3;
  }

  const maxIndex = () => Math.max(0, cards.length - perView);

  // Build dots
  const buildDots = () => {
    dotsWrap.innerHTML = '';
    const count = Math.ceil(cards.length / perView);
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Страница ${i + 1}`);
      on(dot, 'click', () => go(i * perView));
      dotsWrap.appendChild(dot);
    }
  };

  const updateDots = () => {
    $$('.carousel-dot', dotsWrap).forEach((d, i) =>
      d.classList.toggle('active', i === Math.round(current / perView))
    );
  };

  const go = (idx) => {
    current = Math.max(0, Math.min(idx, maxIndex()));
    const cardW = cards[0].offsetWidth + 24; // gap = 24
    track.style.transform = `translateX(${-current * cardW}px)`;
    updateDots();
  };

  on(prevBtn, 'click', () => go(current - perView));
  on(nextBtn, 'click', () => go(current + perView));

  // Touch / drag
  let startX, isDragging = false;
  on(track, 'pointerdown', e => { startX = e.clientX; isDragging = true; track.setPointerCapture(e.pointerId); });
  on(track, 'pointermove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 10) e.preventDefault();
  });
  on(track, 'pointerup', e => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.clientX - startX;
    if (dx < -50) go(current + perView);
    else if (dx > 50) go(current - perView);
  });

  buildDots();

  // Recalculate on resize
  let resizeTimer;
  on(window, 'resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newPV = getPerView();
      if (newPV !== perView) {
        perView = newPV;
        current = 0;
        buildDots();
        go(0);
      }
    }, 200);
  });
})();

// ─── 7. Process steps reveal ──────────────────────
(function initProcessReveal() {
  const steps = $$('.ps');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  steps.forEach(step => observer.observe(step));
})();

// ─── 8. Generic reveal on scroll ──────────────────
(function initReveal() {
  const els = $$('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
})();

// ─── 9. Phone mask ────────────────────────────────
(function initPhoneMask() {
  $$('.phone-input').forEach(input => {
    on(input, 'input', (e) => {
      let val = input.value.replace(/\D/g, '');
      if (val.startsWith('8')) val = '7' + val.slice(1);
      if (!val.startsWith('7')) val = '7' + val;
      val = val.slice(0, 11);

      let result = '+7';
      if (val.length > 1) result += ' (' + val.slice(1, 4);
      if (val.length >= 4) result += ') ' + val.slice(4, 7);
      if (val.length >= 7) result += '-' + val.slice(7, 9);
      if (val.length >= 9) result += '-' + val.slice(9, 11);
      input.value = result;
    });
  });
})();

// ─── 10. Modal ────────────────────────────────────
const modal = {
  backdrop: $('#modalBackdrop'),
  dialog: $('#successModal'),
  closeBtn: $('#modalClose'),
  okBtn: $('#modalOk'),

  open() {
    this.backdrop?.classList.add('open');
    this.dialog?.classList.add('open');
    document.body.style.overflow = 'hidden';
  },
  close() {
    this.backdrop?.classList.remove('open');
    this.dialog?.classList.remove('open');
    document.body.style.overflow = '';
  }
};

on(modal.backdrop, 'click', () => modal.close());
on(modal.closeBtn, 'click', () => modal.close());
on(modal.okBtn, 'click', () => modal.close());
on(document, 'keydown', e => { if (e.key === 'Escape') modal.close(); });

// ─── 11. Form submission ──────────────────────────
(function initForms() {
  const forms = $$('form[data-form]');
  forms.forEach(form => {
    on(form, 'submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Отправляем…';

      // Validate required fields
      const required = $$('[required]', form);
      let valid = true;
      required.forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });
      if (!valid) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        return;
      }

      const data = Object.fromEntries(new FormData(form));
      data.form_type = form.dataset.form;
      data.page_url  = window.location.href;
      data.submitted_at = new Date().toISOString();

      try {
        // Try API first, fallback to console log in dev
        const res = await fetch(`${API_BASE}/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).catch(() => null);

        if (!res || !res.ok) {
          // Dev mode — just show success
          console.log('[Form submitted]', data);
        }

        form.reset();
        modal.open();
      } catch (err) {
        console.error(err);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  });
})();

// ─── 12. Active nav link on scroll ────────────────
(function initActiveNav() {
  const sections = $$('section[id]');
  const links    = $$('.nav-link');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = links.find(l => l.getAttribute('href') === `#${entry.target.id}`);
        active?.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

// ─── 13. Video placeholder click ──────────────────
(function initVideo() {
  const btn = $('#videoPlay');
  if (!btn) return;
  on(btn, 'click', () => {
    // Replace with actual YouTube/Vimeo embed when video is ready
    alert('Видео с производства будет добавлено после съёмки');
  });
})();

// ─── 14. FAB phone button ─────────────────────────
(function initFab() {
  const fabBtn = $('#fabBtn');
  if (!fabBtn) return;
  const sync = () => fabBtn.classList.toggle('visible', window.scrollY > 300);
  sync();
  on(window, 'scroll', sync, { passive: true });
})();

// ─── 15. Hero carousel (infinite loop) ───────────
(function initHeroCarousel() {
  const track = $('#heroCarTrack');
  const wrap  = track && track.parentElement;
  const dotsEl = $('#heroCarDots');
  const prevBtn = $('#heroCarPrev');
  const nextBtn = $('#heroCarNext');
  if (!track || !dotsEl) return;

  const realCards = $$('.hero-card', track);
  const total = realCards.length;
  const GAP = 16;

  // Clone last → prepend, clone first → append for infinite feel
  track.prepend(realCards[total - 1].cloneNode(true));
  track.append(realCards[0].cloneNode(true));
  const allCards = $$('.hero-card', track); // total + 2 items

  let current = 1; // index 0 = clone of last, 1 = first real card
  let timer;

  // Dots for real cards only
  const dots = realCards.map((_, i) => {
    const d = document.createElement('button');
    d.className = 'hero-car-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Слайд ' + (i + 1));
    on(d, 'click', () => goTo(i + 1));
    dotsEl.appendChild(d);
    return d;
  });

  function calcOffset(idx) {
    const wrapW = wrap.offsetWidth;
    const cardW = allCards[0].offsetWidth;
    return (wrapW - cardW) / 2 - idx * (cardW + GAP);
  }

  function updateVisual(idx) {
    allCards.forEach((c, i) => c.classList.toggle('is-active', i === idx));
    const dotIdx = idx === 0 ? total - 1 : idx === total + 1 ? 0 : idx - 1;
    dots.forEach((d, i) => d.classList.toggle('active', i === dotIdx));
  }

  function goTo(n) {
    current = n;
    track.style.transition = 'transform .45s cubic-bezier(.25,.1,.25,1)';
    track.style.transform = `translateX(${calcOffset(current)}px)`;
    updateVisual(current);
    resetTimer();
  }

  // After animation ends: silent jump from clone → real counterpart
  on(track, 'transitionend', () => {
    if (current === 0) {
      track.style.transition = 'none';
      current = total;
      track.style.transform = `translateX(${calcOffset(current)}px)`;
      updateVisual(current);
    } else if (current === total + 1) {
      track.style.transition = 'none';
      current = 1;
      track.style.transform = `translateX(${calcOffset(current)}px)`;
      updateVisual(current);
    }
  });

  on(prevBtn, 'click', () => goTo(current - 1));
  on(nextBtn, 'click', () => goTo(current + 1));

  // Click on peeking card → navigate to it
  allCards.forEach((c, i) => on(c, 'click', () => { if (i !== current) goTo(i); }));

  // Swipe
  let startX = 0;
  on(track, 'touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  on(track, 'touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  on(window, 'resize', () => {
    track.style.transition = 'none';
    track.style.transform = `translateX(${calcOffset(current)}px)`;
  });

  // Восстанавливаем позицию при возврате на вкладку
  on(document, 'visibilitychange', () => {
    if (!document.hidden) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${calcOffset(current)}px)`;
    }
  });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  // Init: wait for layout to settle before calculating offsets
  function init() {
    track.style.transition = 'none';
    track.style.transform = `translateX(${calcOffset(1)}px)`;
    updateVisual(1);
    resetTimer();
  }
  requestAnimationFrame(() => requestAnimationFrame(init));
})();
