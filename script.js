
// Kaveri S K — Portfolio Interactions

document.addEventListener("DOMContentLoaded", () => {

  const progress = document.querySelector(".scroll-progress");
  const cursorGlow = document.querySelector(".cursor-glow");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const revealItems = document.querySelectorAll(".reveal");
  const typed = document.querySelector(".typed-text");
  const sections = [...document.querySelectorAll("main section[id]")];

  // Respect reduced-motion preferences
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  // 1. Scroll Progress Animation

  const updateScroll = () => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const amount = maxScroll > 0
      ? (window.scrollY / maxScroll) * 100
      : 0;

    if (progress) {
      progress.style.width = `${amount}%`;
    }
  };

  window.addEventListener("scroll", updateScroll, {
    passive: true
  });

  updateScroll();


  // 2. Cursor Glow Effect

  if (
    cursorGlow &&
    window.matchMedia("(pointer:fine)").matches &&
    !reduceMotion
  ) {
    window.addEventListener("pointermove", (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }


  // 3. Scroll Reveal Animation

  if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

  } else {

    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

  }


  // 4. Animated Typing Effect

  if (typed) {

    const phrases = [
      "useful web experiences.",
      "thoughtful digital solutions.",
      "clean backend applications."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {

      const phrase = phrases[phraseIndex];

      typed.textContent = phrase.slice(0, charIndex);

      if (!deleting && charIndex < phrase.length) {

        charIndex++;

        setTimeout(type, 62);

      } else if (!deleting) {

        deleting = true;

        setTimeout(type, 1550);

      } else if (charIndex > 0) {

        charIndex--;

        setTimeout(type, 28);

      } else {

        deleting = false;

        phraseIndex = (phraseIndex + 1) % phrases.length;

        setTimeout(type, 300);

      }

    };

    if (reduceMotion) {

      typed.textContent = phrases[0];

    } else {

      setTimeout(type, 500);

    }

  }


  // 5. Mobile Navigation Menu

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

      const open =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(!open)
      );

      menuToggle.setAttribute(
        "aria-label",
        open ? "Open navigation" : "Close navigation"
      );

      nav.classList.toggle("open", !open);

    });

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      });

    });

  }


  // 6. Active Navigation Highlight

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            navLinks.forEach((link) => {

              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`
              );

            });

          }

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  // 7. Magnetic Button Animation

  if (
    !reduceMotion &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    document.querySelectorAll(
      ".button, .header-cta"
    ).forEach((button) => {

      button.addEventListener("pointermove", (event) => {

        const rect = button.getBoundingClientRect();

        const x =
          (event.clientX - rect.left - rect.width / 2) * 0.08;

        const y =
          (event.clientY - rect.top - rect.height / 2) * 0.08;

        button.style.transform =
          `translate(${x}px, ${y}px)`;

      });

      button.addEventListener("pointerleave", () => {

        button.style.transform = "";

      });

    });

  }


  // 8. Dynamic Copyright Year

  const year = document.getElementById("year");

  if (year) {

    year.textContent = new Date().getFullYear();

  }

});
