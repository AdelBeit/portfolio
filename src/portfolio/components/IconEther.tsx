import React, { useEffect } from "react";
import Particle from "../utils/Particle";

export default function IconEther() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let start;
    let imgParticles: Particle[] = [];
    let dotParticles: Particle[] = [];
    let imgs: HTMLImageElement[] = [];

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
      imgParticles = [];
      dotParticles = [];
      for (let i = 0; i < imgs.length; i++) {
        const size = Math.random() * 5 + 30;
        const x = Math.random() * (innerWidth - size * 1.5) + size * 1.5;
        const y = Math.random() * (innerHeight - size * 1.5) + size * 1.5;
        const directionX = Math.random() * 0.2 - 0.1;
        const directionY = Math.random() * 0.2 - 0.1;

        const particle = {
          x: x,
          y: y,
          directionX: directionX,
          directionY: directionY,
          size: size,
          img: imgs[i],
        };

        imgParticles.push(new Particle(particle));
      }

      for (let i = 0; i < 50; i++) {
        const size = 1 + Math.random() * 2;
        const x = Math.random() * (innerWidth - size) + size;
        const y = Math.random() * (innerHeight - size) + size;
        const directionX = Math.random() * 0.2 - 0.1;
        const directionY = Math.random() * 0.2 - 0.1;

        const particle = {
          x: x,
          y: y,
          directionX: directionX,
          directionY: directionY,
          size: size,
        };

        dotParticles.push(new Particle(particle));
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
            ctx.moveTo(
              pA.x + (pA.size - pA.size / 2),
              pA.y + (pA.size - pA.size / 2)
            );
            ctx.lineTo(
              pB.x + (pB.size - pB.size / 2),
              pB.y + (pB.size - pB.size / 2)
            );
            ctx.stroke();
          }
        }
      }
    };

    const animate = (timestamp) => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      animateImgParticles();
      animateDotParticles();
    };

    const animateImgParticles = () => {
      const canvasDimensions = { width: canvas.width, height: canvas.height };
      for (let i = 0; i < imgParticles.length; i++) {
        imgParticles[i].update(canvasDimensions, ctx);
      }
      connect(imgParticles);
    };

    const animateDotParticles = () => {
      const canvasDimensions = { width: canvas.width, height: canvas.height };
      for (let i = 0; i < dotParticles.length; i++) {
        dotParticles[i].update(canvasDimensions, ctx);
      }
    };

    document.addEventListener("imagesPreloaded", (e: CustomEvent) => {
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
      document.removeEventListener("imagesPreloaded", (e: CustomEvent) => {
        imgs = e.detail;
        init();
      });
    };
  }, []);

  return (
    <div className="_container">
      <canvas></canvas>
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
        }
      `}</style>
    </div>
  );
}
