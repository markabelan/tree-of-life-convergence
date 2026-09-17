import { createTreeScene } from "./scene.js";

const stage = document.querySelector("#tree-root");
const buttons = [...document.querySelectorAll(".trait")];

const scene = createTreeScene(stage, {
  onTraitChange(trait) {
    const activeId = trait ? trait.id : null;
    buttons.forEach((btn) => {
      const on = btn.dataset.trait === activeId;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  },
});

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    scene.setTrait(btn.dataset.trait);
  });
});
