export function initNavigation() {

  const buttons =
    document.querySelectorAll("[data-section]");

  const sections =
    document.querySelectorAll(".page-section");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const target =
        button.dataset.section;

      sections.forEach(section => {
        section.classList.remove("active-section");
      });

      const active =
        document.getElementById(target);

      if (active) {
        active.classList.add("active-section");
      }

    });

  });

}