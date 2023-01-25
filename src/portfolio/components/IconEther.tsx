import React, { useEffect } from "react";
import Particle from "../utils/Particle";

export type MouseObject = {
  x: number | null;
  y: number | null;
  radius: number;
};

export default function IconEther() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Particle[] = [];
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
      particles = [];
      const color = "#8c5523";
      const makeOrigin = (n, size) => {
        const x = Math.floor(Math.random() * n);
        if (x < n / 2) return 0 - (size + 10);
        return n + 10 + size;
      };
      for (let i = 0; i < imgs.length; i++) {
        const size = Math.random() * 5 + 30;
        let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
        x = makeOrigin(innerWidth, size);
        let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
        // y = makeOrigin(innerHeight, size);
        const directionX = Math.random() * 3 - 2.5;
        const directionY = Math.random() * 3 - 2.5;

        const particle = {
          x: x,
          y: y,
          directionX: directionX,
          directionY: directionY,
          size: size,
          color: color,
          img: imgs[i],
        };

        particles.push(new Particle(particle));
      }
    };

    const connect = () => {
      let opacity = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const pA = particles[a];
          const pB = particles[b];
          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          const distance = dx * dx + dy * dy;

          if (distance < (canvas.width * canvas.height) / 49) {
            opacity = 1 - distance / 20000;
            ctx.strokeStyle = "rgba(140,85,31," + opacity + ")";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(pA.x + (pA.size - 15), pA.y + (pA.size - 15));
            ctx.lineTo(pB.x + (pB.size - 15), pB.y + (pB.size - 15));
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const canvasDimensions = { width: canvas.width, height: canvas.height };
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvasDimensions, mouse, ctx);
      }
      connect();
    };

    document.addEventListener("imagesPreloaded", (e: CustomEvent) => {
      imgs = e.detail;
      init();
      animate();
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
        animate();
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

export function SVGImage({ icon }: { icon?: string }) {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image(30, 30);
    img.addEventListener(
      "load",
      () => {
        ctx.drawImage(img, 0, 0, 30, 30);
      },
      false
    );

    img.src = "https://cdn.simpleicons.org/simpleicons/red";
  }, []);
  return <div></div>;
}
