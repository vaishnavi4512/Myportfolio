document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".sidebar a");
  const sections = document.querySelectorAll("section");

  // Smooth Scroll on Link Click
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Highlight Active Link on Scroll
  function highlightNav() {
    let scrollY = window.pageYOffset;
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href").slice(1) === id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Animate Sections When in View
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, {
    threshold: 0.1,
  });

  sections.forEach(section => {
    section.classList.add("hidden-section");
    observer.observe(section);
  });

  window.addEventListener("scroll", highlightNav);
});
