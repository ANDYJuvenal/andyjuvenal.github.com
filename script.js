
/* =========================================
   ANDY ILBOUDO — PORTFOLIO INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. ÉLÉMENTS DU SITE
  const header = document.getElementById("header");
  const progressBar = document.getElementById("scrollProgress");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const yearElement = document.getElementById("currentYear");

  // 2. ANNÉE AUTOMATIQUE
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 3. MENU MOBILE
  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Ouvrir le menu" : "Fermer le menu"
    );

    navLinks.classList.toggle("open", !isOpen);
  });

  navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fermer le menu avec la touche Échap
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Fermer le menu si l'on clique en dehors
  document.addEventListener("click", (event) => {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // 4. BARRE DE PROGRESSION ET NAVIGATION
  let scrollScheduled = false;

  function updateScroll() {
    const scrollTop = window.scrollY;
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollableHeight > 0
        ? (scrollTop / scrollableHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
    header.classList.toggle("scrolled", scrollTop > 30);

    // Identifier la section actuellement visible
    let currentSection = "accueil";

    document.querySelectorAll("main section[id]").forEach((section) => {
      if (scrollTop >= section.offsetTop - 180) {
        currentSection = section.id;
      }
    });

    navItems.forEach((link) => {
      const isActive =
        link.getAttribute("href") === `#${currentSection}`;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    scrollScheduled = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollScheduled) {
        window.requestAnimationFrame(updateScroll);
        scrollScheduled = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", updateScroll);
  updateScroll();

  // 5. ANIMATIONS AU DÉFILEMENT
  const revealElements = document.querySelectorAll(".reveal");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // Afficher le contenu même si l'animation n'est pas disponible
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 6. ANIMATION DU BANDEAU
  const ticker = document.querySelector(".ticker-track");

  if (ticker && reducedMotion) {
    ticker.style.animation = "none";
    ticker.style.transform = "none";
    ticker.style.width = "100%";
    ticker.style.flexWrap = "wrap";
    ticker.style.justifyContent = "center";
    ticker.style.gap = "12px 20px";
  }

  // 7. MESSAGE DANS LA CONSOLE
  console.log(
    "%c Andy ILBOUDO | Portfolio ",
    "background:#f59e0b;color:#0b1120;padding:8px;font-weight:bold;"
  );
  console.log("Portfolio initialisé avec succès.");
});
