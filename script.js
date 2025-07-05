// === Section Reveal Animation (Intersection Observer) ===
const sections = document.querySelectorAll(".section, .hero-content, .feature, .testimonial, details");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-section");
    } else {
      entry.target.classList.remove("show-section");
    }
  });
}, { threshold: 0.15 });

sections.forEach((section) => {
  section.classList.add("hide-section");
  observer.observe(section);
});

// === Smooth Scroll to Anchors ===
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// === Dark/Light Mode Toggle with SVG icons and localStorage ===
const sunIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <circle cx="12" cy="12" r="5"/>
  <g stroke="currentColor" stroke-width="2">
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </g>
</svg>`;

const moonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M21 12.79A9 9 0 0112.21 3 7 7 0 0012 21a9 9 0 009-8.21z"/>
</svg>`;

const toggleBtn = document.createElement("button");
toggleBtn.className = "theme-toggle";
toggleBtn.innerHTML = localStorage.getItem("theme") === "dark" ? sunIcon : moonIcon;
document.body.appendChild(toggleBtn);

// Apply saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  toggleBtn.innerHTML = isDark ? sunIcon : moonIcon;
});

// === Floating Background Circles ===
const circleCount = 10;
for (let i = 0; i < circleCount; i++) {
  const circle = document.createElement("div");
  circle.className = "floating-circle";
  circle.style.top = `${Math.random() * 100}%`;
  circle.style.left = `${Math.random() * 100}%`;
  document.body.appendChild(circle);
}

// === Custom Cursor ===
const cursor = document.createElement("div");
cursor.className = "custom-cursor";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// === GSAP Scroll Animations ===
window.addEventListener("load", () => {
  gsap.from(".hero-content h1", { y: -50, opacity: 0, duration: 1 });
  gsap.from(".hero-content p", { y: 30, opacity: 0, duration: 1, delay: 0.5 });
  gsap.from(".cta-button", { scale: 0.8, opacity: 0, duration: 0.8, delay: 1 });

  gsap.from(".features-grid .feature", {
    scrollTrigger: {
      trigger: ".features-grid",
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2
  });

  gsap.from("#cta h2, #cta p, #cta .cta-button", {
    scrollTrigger: {
      trigger: "#cta",
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3
  });
});

// === Mobile Menu Toggle ===
const menuToggle = document.createElement('div');
menuToggle.className = "menu-toggle";
menuToggle.innerHTML = '<span></span><span></span><span></span>';
document.querySelector(".navbar").appendChild(menuToggle);

menuToggle.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

// === Highlight Active Link While Scrolling + Shrink Navbar ===
const sectionsMap = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  let current = "";
  sectionsMap.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 80) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});
