/* ===========================
   NAVIGATION
=========================== */
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===========================
   TYPED TEXT
=========================== */
const roles = [
  'Software Developer',
  'Java Backend Engineer',
  'Spring Boot Developer',
  'REST API Builder',
  'Linux Power User',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, --charIndex);
  } else {
    typedEl.textContent = current.substring(0, ++charIndex);
  }

  let delay = isDeleting ? 38 : 78;

  if (!isDeleting && charIndex === current.length) {
    delay = 1900;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 380;
  }

  setTimeout(type, delay);
}

setTimeout(type, 700);

/* ===========================
   SCROLL REVEAL
=========================== */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ===========================
   ACTIVE NAV LINK
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ===========================
   HERO PARALLAX ORBS
=========================== */
const hero = document.getElementById('hero');

hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  const orb1 = hero.querySelector('.orb-1');
  const orb2 = hero.querySelector('.orb-2');
  if (orb1) orb1.style.transform = `translate(${(x - 0.5) * 40}px, ${(y - 0.5) * 30}px)`;
  if (orb2) orb2.style.transform = `translate(${(0.5 - x) * 28}px, ${(0.5 - y) * 28}px)`;
});

hero.addEventListener('mouseleave', () => {
  const orb1 = hero.querySelector('.orb-1');
  const orb2 = hero.querySelector('.orb-2');
  if (orb1) { orb1.style.transition = 'transform 1s ease'; orb1.style.transform = ''; }
  if (orb2) { orb2.style.transition = 'transform 1s ease'; orb2.style.transform = ''; }
  setTimeout(() => {
    if (orb1) orb1.style.transition = '';
    if (orb2) orb2.style.transition = '';
  }, 1000);
});

/* ===========================
   CARD TILT (subtle 3D)
=========================== */
const tiltCards = document.querySelectorAll('.skill-card, .project-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.55s ease, border-color 0.3s, box-shadow 0.3s';
    card.style.transform = '';
    setTimeout(() => { card.style.transition = ''; }, 560);
  });
});
