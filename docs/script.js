const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  const menuLabel = menuButton.querySelector(".sr-only");
  const setMenuOpen = (isOpen, restoreFocus = false) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    siteNav.classList.toggle("is-open", isOpen);
    if (menuLabel) {
      menuLabel.textContent = isOpen ? "Close navigation" : "Open navigation";
    }
    if (restoreFocus) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      menuButton.getAttribute("aria-expanded") === "true" &&
      !menuButton.contains(event.target) &&
      !siteNav.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, true);
    }
  });

  const desktopNavigation = window.matchMedia("(min-width: 721px)");
  desktopNavigation.addEventListener("change", (event) => {
    if (event.matches) {
      setMenuOpen(false);
    }
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
