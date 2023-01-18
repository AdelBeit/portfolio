export function markActive(e: MouseEvent) {
   let current = e.target as HTMLElement;

   if (current.id.includes('_navbar')) return false;

   while (!current.classList.contains('_button')) {
      current = current.parentElement;
   }
   let parent = current.parentElement;
   parent.querySelector('._button.active')?.classList.remove('active');
   current.classList.add('active');
}