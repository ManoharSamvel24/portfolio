// ============================================
// 1. TYPING EFFECT
// ============================================
const typedText = document.getElementById('typedText');
const roles = [
    'Mobile App Developer',
    'Android & iOS Development',
    'Java · Spring Boot · REST API',
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

/* ============================================================
   PHONE SHOWCASE — hero demo
   ============================================================ */
(() => {
  const phone = document.getElementById("phone");
  const stage = document.getElementById("stage");
  const tilt = document.getElementById("tilt");
  const dotsWrap = document.getElementById("dots");
  const ppBtn = document.getElementById("pp");
  const countEl = document.getElementById("count");
  const clockEl = document.getElementById("clock");
  const screenEl = document.querySelector(".phone-screen");
  if (!phone || !stage) return;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const dots = $$(".ph-dot", dotsWrap);
  const counters = $$("[data-count]");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- SKILLS data ---------- */
  const SKILLS = {
    3: [
      {
        t: "Languages",
        c: "orange",
        i: ["Java*","Kotlin*","Dart*","Python","C","JavaScript","TypeScript","HTML","CSS","XML"],
      },
      {
        t: "Mobile",
        c: "teal",
        i: ["Flutter*","Android (Java + XML)*","Ionic","Angular","Geolocation APIs","Gradle","Xcode","App Store Connect","Google Play Console","macOS Sequoia (iOS builds)"],
      },
      {
        t: "Practice",
        c: "gold",
        i: ["OOP","Clean Architecture","Location-based features","Legacy Android codebase (10 yrs)"],
      },
    ],
    4: [
      {
        t: "Backend & Frameworks",
        c: "orange",
        i: ["Spring Boot*","Spring Data JPA","Hibernate","Flask","REST API Design","MVC Architecture","JDBC","Microservices","Multithreading","Event-Driven patterns"],
      },
      {
        t: "Databases & Tools",
        c: "teal",
        i: ["MySQL","Oracle DB","Git","GitHub","Postman","Android Studio","IntelliJ IDEA","Linux Mint"],
      },
      {
        t: "AI / ML (exposure)",
        c: "gold",
        i: ["LLM Integration","Ollama","Qwen2-7B","NumPy","Matplotlib","EDA (Exploratory Data Analysis)","CustomTkinter"],
      },
    ],
  };

  /* ---------- Build skill chips ---------- */
  Object.entries(SKILLS).forEach(([scene, groups]) => {
    const host = $("#skills" + scene);
    if (!host) return;
    let k = 0;
    groups.forEach((g, b) => {
      const grp = document.createElement("div");
      grp.className = "grp c-" + g.c;
      grp.dataset.s = scene;
      grp.style.setProperty("--b", b);

      const head = document.createElement("div");
      head.className = "gh";
      head.textContent = g.t;

      const wrap = document.createElement("div");
      wrap.className = "chips";

      g.i.forEach((name, j) => {
        const hot = name.endsWith("*");
        const chip = document.createElement("span");
        chip.className = "chip" + (hot ? " hot" : "");
        chip.textContent = hot ? name.slice(0, -1) : name;
        chip.style.setProperty("--j", j);
        chip.style.setProperty("--k", k++);
        wrap.appendChild(chip);
      });

      grp.append(head, wrap);
      host.appendChild(grp);
    });
  });

  const parts = $$("[data-s]", phone);
  const DURATIONS = [5400, 5600, 6800, 7000, 7000, 5600];
  const NAMES = ["Intro","Company","Featured work","Core stack","Backend and data","Contact"];
  const total = dots.length;
  const pad = (n) => String(n).padStart(2, "0");
  const wrapIdx = (n) => (n + total) % total;

  let current = -1;
  const leaveTimers = new Map();
  parts.forEach((p) => (p.inert = true));

  /* ---------- Nav paint ---------- */
  function paintNav(n) {
    dots.forEach((d, i) => {
      d.classList.toggle("is-active", i === n);
      d.classList.toggle("is-done", i < n);
      d.setAttribute("aria-current", i === n ? "step" : "false");
    });
    if (countEl) countEl.textContent = pad(n + 1) + "/" + pad(total);
  }

  /* ---------- Scene switch ---------- */
  function goTo(n) {
    if (n === current) return replay(n);
    const prev = current;
    current = n;
    phone.dataset.scene = n;

    parts.forEach((el) => {
      const s = +el.dataset.s;
      if (s === n) {
        clearTimeout(leaveTimers.get(el));
        el.inert = false;
        el.classList.add("is-live", "is-active");
      } else if (s === prev) {
        el.inert = true;
        el.classList.remove("is-active");
        leaveTimers.set(
          el,
          setTimeout(() => el.classList.remove("is-live"), 900)
        );
      }
    });

    paintNav(n);
    if (n === 1) runCounters();
  }

  /* ---------- Replay current scene ---------- */
  function replay(n) {
    const mine = parts.filter((el) => +el.dataset.s === n);
    phone.classList.add("is-resetting");
    mine.forEach((el) => {
      clearTimeout(leaveTimers.get(el));
      el.classList.remove("is-active", "is-live");
    });
    if (dots[n]) dots[n].classList.remove("is-active");
    void phone.offsetWidth;
    phone.classList.remove("is-resetting");
    mine.forEach((el) => el.classList.add("is-live", "is-active"));
    if (dots[n]) dots[n].classList.add("is-active");
    if (n === 1) runCounters();
  }

  /* ---------- User-initiated navigation ---------- */
  function userGo(n) {
    goTo(wrapIdx(n));
  }

  /* ---------- Dot timers ---------- */
  dots.forEach((d, i) => {
    d.style.setProperty("--dur", DURATIONS[i] + "ms");
    d.dataset.label = NAMES[i];
    d.setAttribute("aria-label", NAMES[i]);
    d.addEventListener("click", () => userGo(i));
  });

  if (dotsWrap) {
    dotsWrap.addEventListener("animationend", (e) => {
      if (e.animationName !== "ph-fill") return;
      const dot = e.target.closest(".ph-dot");
      if (!dot || !dot.classList.contains("is-active")) return;
      goTo(wrapIdx(current + 1));
    });
  }

  phone.classList.add("is-playing");

  /* ---------- Pause sources ---------- */
  let userPaused = reduce, hover = false, focus = false, hold = false, hidden = document.hidden;

  function syncPause() {
    phone.classList.toggle("is-paused", userPaused || hover || focus || hold || hidden);
    phone.classList.toggle("is-user-paused", userPaused);
    if (ppBtn) {
      ppBtn.setAttribute("aria-label", userPaused ? "Play tour" : "Pause tour");
    }
  }

  function togglePause() {
    userPaused = !userPaused;
    syncPause();
  }

  if (ppBtn) ppBtn.addEventListener("click", togglePause);

  phone.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") { hover = true; syncPause(); }
  });
  phone.addEventListener("pointerleave", (e) => {
    hover = false;
    if (e.pointerType !== "mouse") hold = false;
    syncPause();
  });
  phone.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") { hold = true; syncPause(); }
  });
  ["pointerup", "pointercancel"].forEach((t) =>
    phone.addEventListener(t, () => { hold = false; syncPause(); })
  );
  phone.addEventListener("focusin", (e) => {
    focus = e.target.matches(":focus-visible");
    syncPause();
  });
  phone.addEventListener("focusout", () => { focus = false; syncPause(); });
  document.addEventListener("visibilitychange", () => {
    hidden = document.hidden;
    syncPause();
  });
  syncPause();

  /* ---------- Swipe on screen ---------- */
  if (screenEl) {
    let sx = 0, sy = 0, tracking = false, swiped = false;
    screenEl.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      sx = e.clientX; sy = e.clientY;
      tracking = true; swiped = false;
    });
    screenEl.addEventListener("pointerup", (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        swiped = true;
        userGo(current + (dx < 0 ? 1 : -1));
      }
    });
    screenEl.addEventListener("pointercancel", () => (tracking = false));
    screenEl.addEventListener("click", (e) => {
      if (swiped) {
        e.preventDefault();
        e.stopPropagation();
        swiped = false;
      }
    }, true);
  }

  /* ---------- Keyboard ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    switch (e.key) {
      case "ArrowRight": userGo(current + 1); break;
      case "ArrowLeft":  userGo(current - 1); break;
      case "Home":       userGo(0); break;
      case "End":        userGo(total - 1); break;
      case " ":
        if (e.target !== document.body) return;
        togglePause();
        break;
      default: return;
    }
    e.preventDefault();
  });

  /* ---------- Counters ---------- */
  let countRaf = 0;
  function runCounters() {
    cancelAnimationFrame(countRaf);
    if (reduce) {
      counters.forEach((c) => (c.textContent = c.dataset.count + c.dataset.suffix));
      return;
    }
    counters.forEach((c) => (c.textContent = "0" + c.dataset.suffix));
    const start = performance.now() + 750;
    const dur = 1400;
    const step = (t) => {
      const p = Math.min(Math.max((t - start) / dur, 0), 1);
      const e = 1 - Math.pow(1 - p, 4);
      counters.forEach((c) => {
        c.textContent = Math.round(c.dataset.count * e) + c.dataset.suffix;
      });
      if (p < 1) countRaf = requestAnimationFrame(step);
    };
    countRaf = requestAnimationFrame(step);
  }

  /* ---------- Live clock ---------- */
  if (clockEl) {
    (function tickClock() {
      const d = new Date();
      clockEl.textContent =
        (d.getHours() % 12 || 12) + ":" + String(d.getMinutes()).padStart(2, "0");
      setTimeout(tickClock, (60 - d.getSeconds()) * 1000 - d.getMilliseconds() + 50);
    })();
  }

  /* ---------- Fit to viewport ---------- */
  function fit() {
    if (!stage) return;
    const s = Math.min(
      1,
      (window.innerWidth - 48) / 300,
      (window.innerHeight - 150) / 620
    );
    stage.style.setProperty("--s", Math.max(0.4, s).toFixed(4));
  }
  fit();
  window.addEventListener("resize", fit);
  window.addEventListener("orientationchange", fit);

  /* ---------- Tilt (desktop only) ---------- */
  if (!reduce && matchMedia("(hover: hover) and (pointer: fine)").matches && tilt) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const tick = () => {
      raf = 0;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      tilt.style.transform = `perspective(1200px) rotateX(${(-cy * 5).toFixed(2)}deg) rotateY(${(cx * 7).toFixed(2)}deg)`;
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick);
      }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("pointermove", (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      kick();
    });
    document.documentElement.addEventListener("mouseleave", () => {
      tx = ty = 0;
      kick();
    });
  }

  /* ---------- Start ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => goTo(0)));
})();
