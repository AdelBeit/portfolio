import React, { useEffect } from "react";
import Particle from "../utils/Particle";

interface Props {
  canvas: HTMLCanvasElement;
}

export default function IconEther({ canvas }: Props) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles: Particle[] = [];

  let mouse = {
    x: null,
    y: null,
    radius: (canvas.height * canvas.width) / 80 ** 2,
  };

  const trackMouse = (e: MouseEvent) => {
    mouse.x = e.x;
    mouse.y = e.y;
  };

  const resizeHandler = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = (canvas.height * canvas.height) / 80 ** 2;
    init();
  };

  const init = () => {
    particles = [];
    const particleCount = 50;

    //  const mouseRadius = Math.pow(canvas.height / 80, 2);
    const color = "#8c5523";
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 5 + 1;
      console.log("innerwidth:", innerWidth);
      const x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
      const y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
      const directionX = Math.random() * 5 - 2.5;
      const directionY = Math.random() * 5 - 2.5;

      const particle = {
        x: x,
        y: y,
        directionX: directionX,
        directionY: directionY,
        size: size,
        color: color,
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
          ctx.lineWidth = 1;
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

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
    connect();
  };

  useEffect(() => {
    init();
    animate();
  }, []);

  useEffect(() => {
    //  window.addEventListener("mousemove", trackMouse);
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("mousein", () =>
      window.addEventListener("mousemove", trackMouse)
    );
    window.addEventListener("mouseout", () =>
      window.removeEventListener("mousemove", trackMouse)
    );

    return () => {
      // window.removeEventListener("mousemove", trackMouse);
      window.removeEventListener("mousein", () =>
        window.addEventListener("mousemove", trackMouse)
      );
      window.removeEventListener("mouseout", () =>
        window.removeEventListener("mousemove", trackMouse)
      );
      window.removeEventListener("resize", resizeHandler);
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
        }
      `}</style>
    </div>
  );
}
