import { SECTIONS } from "../types";

export default function setActiveNavButton(section: SECTIONS) {
  document.querySelector(`._button.active`)?.classList.remove("active");
  document.querySelector(`._button.${section}`)?.classList.add("active");
}
