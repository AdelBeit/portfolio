import { useEffect } from "react";

type IdleDeadline = { didTimeout: boolean; timeRemaining: () => number };
type IdleCallback = (deadline: IdleDeadline) => void;
type IdleRequest = (cb: IdleCallback) => number;
type IdleCancel = (id: number) => void;

const getIdleRequest = () => {
  if (typeof window === "undefined") return null;
  const requestIdle: IdleRequest | undefined = (window as any).requestIdleCallback;
  if (requestIdle) return requestIdle;
  return (cb: IdleCallback) =>
    window.setTimeout(
      () => cb({ didTimeout: false, timeRemaining: () => 0 }),
      2000
    );
};

const getIdleCancel = () => {
  if (typeof window === "undefined") return null;
  const cancelIdle: IdleCancel | undefined = (window as any).cancelIdleCallback;
  return cancelIdle ?? window.clearTimeout;
};

const preloadVideoInBackground = (src: string) => {
  const preloadVideo = document.createElement("video");
  preloadVideo.preload = "auto";
  preloadVideo.src = src;
  preloadVideo.load();
};

export function useIdleVideoPreload(src: string | null, enabled: boolean) {
  useEffect(() => {
    if (!enabled || !src) return;
    const requestIdle = getIdleRequest();
    if (!requestIdle) return;
    const cancelIdle = getIdleCancel();
    const idleId = requestIdle(() => preloadVideoInBackground(src));
    return () => cancelIdle?.(idleId);
  }, [enabled, src]);
}
