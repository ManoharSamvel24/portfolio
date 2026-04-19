/* ===========================
   NAVIGATION & MOBILE MENU
=========================== */
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===========================
   TYPED TEXT (Professional Identity)
=========================== */
const roles = [
  'Software Developer',
  'Java Backend Engineer',
  'System Architect',
  'Linux Enthusiast',
  'Full-stack Explorer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = roles[roleIndex];
  
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length + 1) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// Start typing after initial load
window.addEventListener('load', () => {
  setTimeout(type, 1000);
});

/* ===========================
   SCROLL REVEAL OBSERVER
=========================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-up, .reveal-left').forEach(el => {
  revealObserver.observe(el);
});

/* ===========================
   INTERNAL DATA LOGIC (Optional)
=========================== */
// Keeping track of your updated CGPA for any future dynamic components
const developerProfile = {
  name: "Manohar Samvel",
  status: "Job Seeking",
  cgpa: 8.40,
  specialization: "Java/Spring Boot"
};
console.log("System Loaded: 8.40 Verified.");
