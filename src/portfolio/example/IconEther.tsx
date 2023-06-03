import React, {useEffect, useRef, useState} from "react";

// import { urlExists } from "./index";

/**
 * TODO: fix url exists
 * Returns a URL string to the Simple Icons (SI) CDN with the given icon name and color.
 * Icon name must match SI icon name, if name doesn't match SI or doesn't exist on SI, the fallback folder is checked for icon with exact name.
 * Fallback icons folder must be structure like so: [project root dir]/public/fallback_icons/*.svg
 * @param icon - the name of the icon to be fetched (must match simpleicons name)
 * @param color - the hex color of the icon
 * @returns a URL string to the Simple Icons CDN or a local path
 */
export async function simpleIconsCDN(icon: string, color: string = "#33FF00") {
  color = color.replace("#", "");
  const simpleIconsCDN = `https://cdn.simpleicons.org/${icon}/${color}`;
  return simpleIconsCDN;
  // if (await urlExists(simpleIconsCDN)) return simpleIconsCDN;

  // const fallbackURL = `./fallback_icons/${icon}.svg`;
  // if (await urlExists(fallbackURL)) return fallbackURL;

  const event = new CustomEvent("IconLoadFailed", {detail: icon});
  document.dispatchEvent(event);
  return "";
}

/**
 * Preloads images by creating Image objects
 * @param iconNames - an array of icon names to be preloaded
 * @returns an array of Image objects
 */
export async function preLoadImages(
  iconNames: string[],
  color: string = "#33ff00"
) {
  const URLs = iconNames.map((i) => simpleIconsCDN(i, color));

  return Promise.all(URLs.map(async (url) => loadImage(await url)));
}

function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image(30, 30);
  return new Promise((res, rej) => {
    img.onload = () => res(img);
    img.onerror = () => rej(new Error("Failed to load " + url));
    img.src = url;
  });
}

/**
 * Particle
 * @description - circle canvas shape, provide <img /> for img entities on canvas
 * @property {boolean} shouldFlicker - when true, circle shapes will flicker 20% of the time, does not affect img particles.
 */
export class Particle {
  x: number;
  y: number;
  dX: number;
  dY: number;
  size: number;
  maxSize: number;
  img: HTMLImageElement | undefined;
  tStep: number;
  t: number;
  color: string;
  shouldFlicker: boolean;

  constructor({
    x,
    y,
    dX,
    dY,
    size,
    img = undefined,
    color = "#33FF00",
    flicker = false,
  }: {
    x: number;
    y: number;
    dX: number;
    dY: number;
    size: number;
    img?: HTMLImageElement | undefined;
    color?: string;
    flicker?: boolean;
  }) {
    this.x = x;
    this.y = y;
    this.dX = dX;
    this.dY = dY;
    this.size = size;
    this.maxSize = size;
    this.img = img;
    this.tStep = Math.random() * 0.01 + 0.01;
    this.t = Math.random() * 100;
    this.color = color;
    this.shouldFlicker = flicker;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.img)
      ctx.drawImage(
        this.img,
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
    else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  update(ctx: CanvasRenderingContext2D) {
    // random movement pattern
    // boundary collision
    if (this.x > ctx.canvas.width - this.size / 2 || this.x < this.size / 2) {
      this.dX *= -1;
    }
    if (this.y > ctx.canvas.height - this.size / 2 || this.y < this.size / 2) {
      this.dY *= -1;
    }
    this.x += this.dX;
    this.y += this.dY;

    if (!this.img && this.shouldFlicker && Math.random() < 0.2) {
      this.flicker();
    }
    this.draw(ctx);
  }

  flicker() {
    const radius = this.maxSize / 4 + (Math.random() * this.maxSize * 3) / 4;
    this.size = radius;
  }
}

/**
 * Hex: hex color code, e.g. #ffffff
 * Opacity: opacity value, e.g. 0.5
 */
function hexToRGBA(hex: string, opacity: number) {
  const hexRegex = /^#[0-9A-Fa-f]{6}$/;

  if (!hexRegex.test(hex)) throw new Error("Invalid hex color code");
  if (opacity < 0 || opacity > 1) throw new Error("Invalid opacity value");

  hex = hex.replace("#", "");
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
}

interface Props {
  particlesShouldConnect?: boolean;
  renderImages?: boolean;
  renderDots?: boolean;
  backgroundColor?: string;
  particleColor?: string;
  icons: string[];
  dotSize?: number;
  flickerDots?: boolean;
}

/**
 * IconEther
 * Renders a component with moving particles
 * @param backgroundColor Background color in hexadecimal string format, i.e. "#ffffff"
 * @param particleColor Particle color in hexadecimal hexadecimal string format, i.e. "#ffffff"
 * @param renderImages Determines if the images should be rendered.
 * @param renderDots Determines if the dots should be rendered.
 * @param icons The name of icons to render.
 * @param dotSize Dot particle size
 * @param flickerDots Determines if the dots should flicker
 * @returns IconEther Component
 */
function IconEther({
  backgroundColor = "#282828",
  particleColor = "#33FF00",
  renderImages = true,
  renderDots = false,
  icons = ["typescript", "javascript", "nextdotjs", "react", "vercel"],
  dotSize = 2,
  flickerDots = true,
}: Props) {
  if (flickerDots) renderDots = true;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = React.useState<HTMLImageElement[]>(
    []
  );
  const maxImgs = useRef(30);
  const imgSize = useRef(20);
  const maxDots = useRef(20);
  const [imgParticles, setImgParticles] = useState<Particle[]>([]);
  const [dotParticles, setDotParticles] = useState<Particle[]>([]);
  const animationID = useRef<null | number>(null);

  // 1. preflight init
  // **** 1. loadimages()
  const loadImages = async () => {
    if (!renderImages) return;
    const imgs = await preLoadImages(icons, particleColor);
    setLoadedImages(imgs);
  };

  useEffect(() => {
    loadImages();
  }, []);

  // 2. init
  // **** 1. setup particle parameters
  // **** 2. generate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!imgsLoaded()) return;

    initialize(canvas);
  }, [loadedImages, canvasRef.current]);

  // **** 3. call loop
  useEffect(() => {
    if (!dotParticles || !imgsLoaded()) return;
    animationID.current = requestAnimationFrame(animate);
  }, [dotParticles, imgParticles]);

  // 3. manipulate loop
  // **** 1. reinit after window resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let debounceTimer;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => initialize(canvas), 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(debounceTimer);
    };
  }, [canvasRef.current]);

  const initialize = (canvas: HTMLCanvasElement) => {
    clearAnimations();
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    maxImgs.current = canvas.width <= 500 ? 10 : canvas.width <= 700 ? 18 : 30;
    imgSize.current = canvas.width <= 500 ? 20 : canvas.width <= 700 ? 27 : 30;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = hexToRGBA(backgroundColor, 0.6);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    maxImgs.current = Math.min(loadedImages.length, maxImgs.current);
    if (renderImages) {
      generateParticles(canvas, "imgs");
    }
    if (renderDots) {
      generateParticles(canvas, "dots");
    }
  };

  const generateParticles = (
    canvas: HTMLCanvasElement,
    type: "dots" | "imgs"
  ) => {
    let count = maxDots.current;
    const particles: Particle[] = [];

    if (type === "imgs") count = maxImgs.current;

    for (let i = 0; i < count; i++) {
      let size = 1 + Math.random() * dotSize;
      if (type === "imgs")
        size = (Math.random() * imgSize.current) / 2.5 + imgSize.current;
      const x = size * 2 + Math.random() * (canvas.width - size * 4);
      const y = size * 2 + Math.random() * (canvas.height - size * 4);
      const dX = (Math.random() * 2 - 1) / 10;
      const dY = (Math.random() * 2 - 1) / 10;
      const img = type === "imgs" ? loadedImages[i] : undefined;

      const particle = {
        x: x,
        y: y,
        dX: dX,
        dY: dY,
        size:
          size / (canvas.width <= 500 ? 1.2 : canvas.width <= 700 ? 1.1 : 1),
        img: img,
        color: particleColor,
        flicker: flickerDots,
      };

      particles.push(new Particle(particle));
    }

    if (type === "imgs") {
      setImgParticles(particles);
    } else setDotParticles(particles);
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    animationID.current = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (renderImages) {
      imgParticles.map((i: Particle) => i!.update(ctx));
    }
    if (renderDots) {
      dotParticles.map((i: Particle) => i!.update(ctx));
    }
    ctx.fillStyle = hexToRGBA(backgroundColor, 0.6);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // utils
  const clearAnimations = () => {
    if (animationID.current) cancelAnimationFrame(animationID.current);
  };

  const imgsLoaded = () => renderImages && loadedImages.length > 0;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          zIndex: 0,
          inset: 0,
          background: backgroundColor,
        }}></canvas>
      <div
        style={{
          position: "fixed",
          zIndex: 0,
          inset: 0,
          top: "-10px",
        }}></div>
    </>
  );
}

export {IconEther};
