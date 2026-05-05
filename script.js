// hambuguer menu toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburguer-icon");
  menu?.classList.toggle("open");
  icon?.classList.toggle("open");
}

const animatedSelectors = [
  "#profile .section__pic-container",
  "#profile .section__text",
  "#about .section__pic-container",
  "#about .details-container",
  "#about .text-container",
  "#experience .details-container",
  "#projects .details-container",
  "#contact .contact-info-upper-container",
];

function setupAnimations() {
  const animatedElements = document.querySelectorAll(animatedSelectors.join(", "));

  animatedElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index * 90, 540)}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  animatedElements.forEach((element) => observer.observe(element));
}

function setupActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .menu-links a");

  if (!sections.length || !navLinks.length) return;

  const setActiveLink = () => {
    let currentSection = "profile";

    sections.forEach((section) => {
      const top = window.scrollY;
      const offset = section.offsetTop - 180;
      const height = section.offsetHeight;

      if (top >= offset && top < offset + height) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentSection}`;
      link.classList.toggle("active-link", isActive);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
}

document.addEventListener("DOMContentLoaded", () => {
  setupAnimations();
  setupActiveNav();
});
