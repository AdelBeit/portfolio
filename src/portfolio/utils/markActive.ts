export function markActive(e: MouseEvent) {
  let current = e.target as HTMLElement;
  const illegalIcons = ["music", "arrowup", "arrowdown", "github", "linkedin", "email", "resume"];
  if (current.id.includes("_navbar")) return false;

  while (!current.classList.contains("_button")) {
    current = current.parentElement;
  }

  if (illegalIcons.some((string) => current.classList.contains(string))) return;

  let parent = current.parentElement;

  parent.querySelector("._button.active")?.classList.remove("active");
  current.classList.add("active");
}
