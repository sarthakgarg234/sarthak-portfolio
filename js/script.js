/* ============================================================
   Sarthak Garg — Developer Portfolio
   script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initProjectFilters();
  initTerminal();
  initContactForm();
  initCursor();
  initScrollSpy();
  initFooterYear();
});

/* ---------- THEME (dark/light) ---------- */
function initTheme() {
  const root = document.documentElement;
  const toggleBtns = document.querySelectorAll('.theme-toggle');
  const stored = localStorage.getItem('sg-theme');

  if (stored) {
    root.setAttribute('data-theme', stored);
  } else {
    root.setAttribute('data-theme', 'dark');
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('sg-theme', next);
    });
  });
}

/* ---------- NAVBAR SCROLL STATE ---------- */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 12) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- ACTIVE NAV LINK (scroll-spy for one-page layout) ---------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const linksByHash = {};
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.charAt(0) === '#') {
      (linksByHash[href] = linksByHash[href] || []).push(link);
    }
  });

  function setActive(hash) {
    navLinks.forEach(l => l.classList.remove('active'));
    (linksByHash[hash] || []).forEach(l => l.classList.add('active'));
  }

  // Default to Home until a section reports itself in view
  setActive('#home');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive('#' + entry.target.id);
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));
}

/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

/* ---------- PROJECT FILTERS ---------- */
function initProjectFilters() {
  const filterBar = document.querySelector('.filter-bar');
  const cards = document.querySelectorAll('.project-card');
  if (!filterBar || !cards.length) return;

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const categories = card.dataset.category || '';
      const match = filter === 'all' || categories.includes(filter);

      if (match) {
        card.classList.remove('hidden-item');
        card.style.animation = 'none';
        // Force reflow to restart animation
        void card.offsetWidth;
        card.style.animation = 'fadeUpCard 0.5s ease forwards';
      } else {
        card.classList.add('hidden-item');
      }
    });
  });
}

// Keyframe injected via JS to keep CSS file focused on static styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes fadeUpCard {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleSheet);

/* ---------- TERMINAL TYPING EFFECT ---------- */
function initTerminal() {
  const terminalBody = document.querySelector('.terminal-body');
  if (!terminalBody) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { cmd: 'whoami', out: 'Sarthak Garg' },
    { cmd: 'role', out: 'Backend Developer' },
    { cmd: 'primary_stack', out: 'PHP • Laravel • WordPress • MySQL' },
    { cmd: 'location', out: 'Dehradun, India' },
    { cmd: 'status', out: 'Open to opportunities' }
  ];

  if (prefersReducedMotion) {
    terminalBody.innerHTML = lines
      .map(l => `<div><span class="prompt">$</span> ${l.cmd}</div><span class="output">${l.out}</span>`)
      .join('');
    return;
  }

  terminalBody.innerHTML = '';
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      terminalBody.appendChild(cursor);
      return;
    }

    const { cmd, out } = lines[lineIndex];
    const cmdRow = document.createElement('div');
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = '$ ';
    cmdRow.appendChild(promptSpan);
    const cmdText = document.createElement('span');
    cmdRow.appendChild(cmdText);
    terminalBody.appendChild(cmdRow);

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      cmdText.textContent = cmd.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex >= cmd.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          const outRow = document.createElement('span');
          outRow.className = 'output';
          outRow.textContent = out;
          terminalBody.appendChild(outRow);
          lineIndex++;
          setTimeout(typeLine, 300);
        }, 200);
      }
    }, 45);
  }

  // Start typing when the terminal scrolls into view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeLine();
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(terminalBody);
  } else {
    typeLine();
  }
}

/* ---------- CONTACT FORM VALIDATION ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: { el: form.querySelector('#name'), validate: v => v.trim().length > 0, msg: 'Please enter your name.' },
    email: { el: form.querySelector('#email'), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
    subject: { el: form.querySelector('#subject'), validate: v => v.trim().length > 0, msg: 'Please enter a subject.' },
    message: { el: form.querySelector('#message'), validate: v => v.trim().length > 0, msg: 'Please enter a message.' }
  };

  function validateField(key) {
    const field = fields[key];
    if (!field || !field.el) return true;
    const group = field.el.closest('.form-group');
    const errorEl = group ? group.querySelector('.form-error') : null;
    const valid = field.validate(field.el.value);

    if (group) group.classList.toggle('has-error', !valid);
    if (errorEl) errorEl.textContent = valid ? '' : field.msg;

    return valid;
  }

  Object.keys(fields).forEach(key => {
    const el = fields[key].el;
    if (!el) return;
    el.addEventListener('blur', () => validateField(key));
    el.addEventListener('input', () => {
      const group = el.closest('.form-group');
      if (group && group.classList.contains('has-error')) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allValid = true;
    Object.keys(fields).forEach(key => {
      if (!validateField(key)) allValid = false;
    });

    const statusEl = document.getElementById('form-status');

    if (allValid) {
      form.reset();
      if (statusEl) {
        statusEl.textContent = "Thanks! Your message has been validated. Connect the form to your preferred email service/backend to receive submissions.";
        statusEl.classList.add('show', 'success');
      }
    } else if (statusEl) {
      statusEl.classList.remove('show', 'success');
      statusEl.textContent = '';
    }
  });
}

/* ---------- CUSTOM CURSOR (desktop only, subtle) ---------- */
function initCursor() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReducedMotion) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.classList.add('cursor-active');

  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    ringX = e.clientX;
    ringY = e.clientY;
  });

  function animateRing() {
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '46px';
      ring.style.height = '46px';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
    });
  });
}

/* ---------- FOOTER YEAR (kept manual per copyright line, but future-proofed) ---------- */
function initFooterYear() {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
