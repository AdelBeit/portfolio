export function scrollHandler(e: WheelEvent) {
  e.preventDefault();
  document.querySelector("#_viewbox").scrollBy(0, e.deltaY);
}
