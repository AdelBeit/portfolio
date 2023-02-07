import React, { useEffect } from "react";
import { ETHERICONS } from "../../../public/portfolio.data";
import Particle from "../utils/Particle";
import { simpleIconsCDN } from "../utils/preLoadImages";

// TODO: use particlejs instead for animating the particles. there is a bug with variable dx,dy after screen resize events

export const etherIcons = ETHERICONS.map((i) => simpleIconsCDN(i));

export default function IconEther() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let imgParticles: Particle[] = [];
    let dotParticles: Particle[] = [];
    let imgs: HTMLImageElement[] = [];
    const maxImgs = canvas.width <= 500 ? 10 : canvas.width <= 700 ? 18 : 30;
    const imgSize = canvas.width <= 500 ? 12 : canvas.width <= 700 ? 20 : 27;

    let mouse = {
      x: null,
      y: null,
      radius: (canvas.height * canvas.width) / 80 ** 2,
    };

    const trackMouse = (e: MouseEvent, { track = true } = {}) => {
      if (track) {
        mouse.x = e.x;
        mouse.y = e.y;
      } else {
        mouse.x = undefined;
        mouse.y = undefined;
      }
    };

    const resizeHandler = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      mouse.radius = (canvas.height * canvas.height) / 80 ** 2;
      init();
    };

    const init = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      imgParticles = [];
      dotParticles = [];
      const dotParticleCount = 20;
      const n = Math.min(imgs.length, maxImgs);
      for (let i = 0; i < n + dotParticleCount; i++) {
        let size = 1 + Math.random() * 2;
        if (i < n) size = (Math.random() * imgSize) / 2.5 + imgSize;
        const x = size * 2 + Math.random() * (innerWidth - size * 4);
        const y = size * 2 + Math.random() * (innerHeight - size * 4);
        const dX = (Math.random() * 2 - 1) / 10;
        const dY = (Math.random() * 2 - 1) / 10;
        const img = i < n ? imgs[i] : null;

        const particle = {
          x: x,
          y: y,
          dX: dX,
          dY: dY,
          size:
            size / (canvas.width <= 500 ? 1.2 : canvas.width <= 700 ? 1.1 : 1),
          img: img,
        };
        if (i < n) imgParticles.push(new Particle(particle));
        else dotParticles.push(new Particle(particle));
      }

      requestAnimationFrame(animate);
    };

    const connect = (particles: Particle[]) => {
      let opacity = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const pA = particles[a];
          const pB = particles[b];
          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          const distance = dx * dx + dy * dy;

          if (distance < (canvas.width * canvas.height) / 49) {
            opacity = 1 - distance / 10000;
            ctx.strokeStyle = `rgba(51, 255, 0, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      animateImgParticles();
      // animateDotParticles();
    };

    const animateImgParticles = () => {
      const n = Math.min(imgParticles.length, maxImgs);
      for (let i = 0; i < n; i++) {
        // for (let i = 0; i < 1; i++) {
        imgParticles[i].update(ctx);
      }
      // connect(imgParticles);
    };

    const animateDotParticles = () => {
      for (let i = 0; i < dotParticles.length; i++) {
        dotParticles[i].update(ctx);
      }
      connect(dotParticles);
    };

    document.addEventListener("EtherIconsLoaded", (e: CustomEvent) => {
      imgs = e.detail;
      init();
    });

    window.addEventListener("mousemove", trackMouse);
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("mouseout", (e) => trackMouse(e, { track: false }));

    return () => {
      window.removeEventListener("mousemove", trackMouse);
      window.removeEventListener("mouseout", (e) =>
        trackMouse(e, { track: false })
      );
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("EtherIconsLoaded", (e: CustomEvent) => {
        imgs = e.detail;
        init();
      });
    };
  }, []);

  return (
    <div className="_container">
      <canvas></canvas>
      <div className="blurred-background absolute"></div>
      <style jsx>{`
        ._container {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(#ffc38c, #ff0b40);
          background: black;
          background: var(--black);
          opacity: 0.4;
          z-index: 0;
        }
      `}</style>
    </div>
  );
}
