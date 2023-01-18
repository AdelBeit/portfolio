export function markActive(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
   let current = e.target as HTMLDivElement;
   let parent = current.parentElement;
   while (parent.id !== "nav_bar") {
      parent = parent.parentElement;
   }
   let activeElements = parent.querySelectorAll('._container.active');
   for (let element of Array.from(activeElements)) {
      element.classList.remove('active');
   }
   current.classList.add('active');
}