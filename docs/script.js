const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

function githubIssueURL(title) {
  const host = window.location.hostname;
  const segments = window.location.pathname.split("/").filter(Boolean);

  if (!host.endsWith(".github.io")) {
    return null;
  }

  const owner = host.split(".")[0];
  const repository = segments[0] || `${owner}.github.io`;
  const query = new URLSearchParams({
    title: `${title}: `,
    labels: "support"
  });
  return `https://github.com/${owner}/${repository}/issues/new?${query}`;
}

document.querySelectorAll("[data-github-support]").forEach((link) => {
  const title = link.dataset.supportTitle || "Support request";
  const url = githubIssueURL(title);

  if (url) {
    link.href = url;
  } else {
    link.setAttribute("aria-disabled", "true");
    link.title = "This support link becomes active on the published GitHub Pages site.";
    link.addEventListener("click", (event) => event.preventDefault());
  }
});
