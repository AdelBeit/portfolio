import { useEffect, useState } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
};

const isVisibleByThreshold = (el: HTMLElement, threshold: number) => {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  if (rect.width <= 0 || rect.height <= 0) return false;

  const visibleHeight =
    Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const visibleWidth =
    Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);

  if (visibleHeight <= 0 || visibleWidth <= 0) return false;

  const visibleArea = visibleHeight * visibleWidth;
  const totalArea = rect.width * rect.height;
  return visibleArea >= totalArea * threshold;
};

export function useInViewOnce(
  ref: React.RefObject<HTMLElement>,
  { threshold = 0.5, rootMargin = "0px" }: Options = {}
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) return;
    if (typeof window === "undefined") return;
    const target = ref.current;
    if (!target) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold, rootMargin }
      );
      observer.observe(target);
      return () => observer.disconnect();
    }

    let cleanup: (() => void) | null = null;
    const startFallback = () => {
      const check = () => {
        if (isVisibleByThreshold(target, threshold)) {
          setIsInView(true);
          cleanup?.();
        }
      };
      const onEvent = () => check();
      window.addEventListener("scroll", onEvent, { passive: true });
      window.addEventListener("resize", onEvent);
      cleanup = () => {
        window.removeEventListener("scroll", onEvent);
        window.removeEventListener("resize", onEvent);
      };
      check();
    };

    const rafId = window.requestAnimationFrame(startFallback);
    return () => {
      window.cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, [isInView, ref, threshold, rootMargin]);

  return isInView;
}
