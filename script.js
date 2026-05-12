const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const menuDialog = document.querySelector("[data-menu-dialog]");
const dialogImage = document.querySelector("[data-dialog-image]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogClose = document.querySelector("[data-dialog-close]");

document.querySelectorAll("[data-menu-image]").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.getAttribute("data-menu-image");
    const title = button.getAttribute("data-menu-title");

    dialogImage.setAttribute("src", image);
    dialogImage.setAttribute("alt", `Foto ampliada del menú: ${title}`);
    dialogTitle.textContent = title;

    if (typeof menuDialog.showModal === "function") {
      menuDialog.showModal();
    }
  });
});

dialogClose.addEventListener("click", () => {
  menuDialog.close();
});

menuDialog.addEventListener("click", (event) => {
  if (event.target === menuDialog) {
    menuDialog.close();
  }
});
