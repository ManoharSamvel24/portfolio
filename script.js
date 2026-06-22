// ============================================
// 1. TYPING EFFECT
// ============================================
const typedText = document.getElementById('typedText');
const roles = [
    'Mobile App Developer',
    'Flutter · Android · iOS',
    'Java · Spring Boot',
    'Full-Stack Enthusiast'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typedText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1500; // pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// ============================================
// 2. CUSTOM CURSOR
// ============================================
const cursor = document.getElementById('customCursor');
const dot = cursor.querySelector('.cursor-dot');
const ring = cursor.querySelector('.cursor-ring');

let mouseX = 0,
    mouseY = 0;
let ringX = 0,
    ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
}

animateRing();

// Hide cursor on touch devices
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
    document.querySelectorAll('a, button, input, textarea').forEach(el => el.style.cursor = 'auto');
}

// ============================================
// 3. MAGNETIC BUTTONS
// ============================================
document.querySelectorAll('.btn-primary, .btn-ghost, .card-cta, .proj-link, .social-link, .hamburger').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ============================================
// 4. TILT EFFECT ON PROJECT CARDS
// ============================================
document.querySelectorAll('.project-card, .skill-card, .timeline-content, .card-inner, .contact-card-inner').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translate(-3px, -3px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translate(0, 0)';
    });
});

// ============================================
// 5. SCROLL REVEAL (Intersection Observer)
// ============================================
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => observer.observe(el));

// ============================================
// 6. SCROLL PROGRESS BAR
// ============================================
const progressBar = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});

// ============================================
// 7. MOBILE MENU (Hamburger)
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
    });
});

// ============================================
// 8. NAV HIDE ON SCROLL DOWN
// ============================================
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
    } else {
        nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});
