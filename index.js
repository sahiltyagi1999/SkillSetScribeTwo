/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════════ */
const dot     = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outX = 0, outY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

(function animateCursor() {
  outX += (mouseX - outX) * 0.14;
  outY += (mouseY - outY) * 0.14;
  outline.style.left = outX + 'px';
  outline.style.top  = outY + 'px';
  requestAnimationFrame(animateCursor);
})();

// Grow cursor on interactive elements
document.querySelectorAll('a, button, .bento-card, .service-card, .tag').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ═══════════════════════════════════════════════════════════════
   TYPED.JS — hero role text
═══════════════════════════════════════════════════════════════ */
new Typed('.auto', {
  strings: [
    'full-stack experiences.',
    'scalable backends.',
    'pixel-perfect UIs.',
    'AI-powered tools.',
  ],
  loop: true,
  typeSpeed: 60,
  backSpeed: 35,
  backDelay: 2000,
  smartBackspace: true,
});

/* ═══════════════════════════════════════════════════════════════
   HEADER — scroll behaviour
═══════════════════════════════════════════════════════════════ */
const header    = document.getElementById('header');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 60);
  scrollTop.classList.toggle('visible', y > 300);
  updateActiveNav();
});

/* ═══════════════════════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════════════════════ */
const menuBtn = document.getElementById('menuIcon');
const navbar  = document.getElementById('navbar');

menuBtn.addEventListener('click', () => {
  const open = menuBtn.classList.toggle('open');
  navbar.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    navbar.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ═══════════════════════════════════════════════════════════════
   ACTIVE NAV LINK — scroll spy
═══════════════════════════════════════════════════════════════ */
function updateActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const scrollPos = window.scrollY + window.innerHeight * 0.3;

  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.dataset.section === id);
      });
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE
═══════════════════════════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

const saved = localStorage.getItem('theme');
if (saved === 'light') applyLight(true);

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light');
  applyLight(!isLight);
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
});

function applyLight(on) {
  document.body.classList.toggle('light', on);
  themeIcon.className = on ? 'bx bx-sun' : 'bx bx-moon';
}

/* ═══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — scroll reveal
═══════════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill fills when skills card is visible
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      // Animate SVG rings
      const rings = entry.target.querySelectorAll('.ring-fill');
      rings.forEach(ring => {
        const pct = parseFloat(ring.dataset.pct);
        const circumference = 2 * Math.PI * 42; // r=42
        const offset = circumference - (pct / 100) * circumference;
        ring.style.strokeDashoffset = offset;
      });
    }
  });
}, { threshold: 0.12 });

// Attach reveal to various elements
document.querySelectorAll(
  '.home-content, .home-image-wrapper, ' +
  '.about-img-wrap, .about-content, ' +
  '.timeline-card, ' +
  '.skills-card, ' +
  '.service-card, ' +
  '.bento-card, ' +
  '.achievement-card, ' +
  '.contact-left, .contact-form, ' +
  '.section-header, ' +
  '.badge, .about-stats'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Directional reveals
document.querySelectorAll('.about-img-wrap').forEach(el => el.classList.add('reveal-left'));
document.querySelectorAll('.about-content, .contact-form').forEach(el => el.classList.add('reveal-right'));

// Stagger cards
document.querySelectorAll('.service-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});
document.querySelectorAll('.bento-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`;
});
document.querySelectorAll('.achievement-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});
document.querySelectorAll('.timeline-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 100}ms`;
});

/* ═══════════════════════════════════════════════════════════════
   SVG GRADIENT — inject <defs> for ring gradient
═══════════════════════════════════════════════════════════════ */
const svgNS = 'http://www.w3.org/2000/svg';
document.querySelectorAll('.soft-ring svg').forEach(svg => {
  const defs = document.createElementNS(svgNS, 'defs');
  const grad = document.createElementNS(svgNS, 'linearGradient');
  grad.setAttribute('id', 'ringGrad');
  grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '0%');

  const stop1 = document.createElementNS(svgNS, 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#7c6dfa');

  const stop2 = document.createElementNS(svgNS, 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', '#a78bfa');

  grad.appendChild(stop1);
  grad.appendChild(stop2);
  defs.appendChild(grad);
  svg.insertBefore(defs, svg.firstChild);
});


/* ═══════════════════════════════════════════════════════════════
   SMOOTH HOVER TILT on bento cards (subtle)
═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
