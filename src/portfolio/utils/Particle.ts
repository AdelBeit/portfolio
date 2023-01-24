/*
styles
*{
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}
#canvas1{
   position:absolute;
   top:0;
   left:0;
   width:100%;
   height: 100%;
   background: radial-gradient(#ffc38c, #ff0b40);
}
*/

import { MouseObject } from "../components/particleCloud";

/*
html
<canvas id="canvas1"></canvas>
<script src="src"></script>

*/

// const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// let particlesArray;

// let mouse = {
//    x: null,
//    y: null,
//    radius: (canvas.height / 80) * (canvas.width / 80),
// };

// window.addEventListener("mousemove", function (event) {
//    mouse.x = event.x;
//    mouse.y = event.y;
// });

export default class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;

  constructor({
    x,
    y,
    directionX,
    directionY,
    size,
    color,
  }: {
    x: number;
    y: number;
    directionX: number;
    directionY: number;
    size: number;
    color: string;
  }) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color || "#9c5523";
    ctx.fill();
  }

  update(
    canvas: { width: number; height: number },
    mouse: MouseObject,
    ctx: CanvasRenderingContext2D,
    { deterMouse = false } = {}
  ) {
    // boundary detection
    if (this.x > canvas.width || this.x < 0) {
      this.directionX *= -1;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY *= -1;
    }

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // move particles away from mouse
    if (distance < mouse.radius + this.size && deterMouse) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw(ctx);
  }
}

// function init() {
//    particlesArray = [];
//    let numberOfParticles = (canvas.height * canvas.width) / 9000;
//    for (let i = 0; i < numberOfParticles; i++) {
//       let size = Math.random() * 5 + 1;
//       let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
//       let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
//       let directionX = Math.random() * 5 - 2.5;
//       let directionY = Math.random() * 5 - 2.5;
//       let color = "#8C5523";

//       particlesArray.push(
//          new Particle(x, y, directionX, directionY, size, color)
//       );
//    }
// }

// function connect() {
//    let opacityValue = 1;
//    for (let a = 0; a < particlesArray.length; a++) {
//       for (let b = a; b < particlesArray.length; b++) {
//          let distance =
//             Math.pow(particlesArray[a].x - particlesArray[b].x, 2) +
//             Math.pow(particlesArray[a].y - particlesArray[b].y, 2);
//          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
//             opacityValue = 1 - distance / 20000;
//             ctx.strokeStyle = "rgba(140,85,31," + opacityValue + ")";
//             ctx.lineWidth = 1;
//             ctx.beginPath();
//             ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
//             ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
//             ctx.stroke();
//          }
//       }
//    }
// }

// function animate() {
//    requestAnimationFrame(animate);
//    ctx.clearRect(0, 0, innerWidth, innerHeight);

//    for (let i = 0; i < particlesArray.length; i++) {
//       particlesArray[i].update();
//    }
//    connect();
// }

// window.addEventListener("resize", function () {
//    canvas.width = innerWidth;
//    canvas.height = innerHeight;
//    mouse.radius = (canvas.height / 80) * (canvas.height / 80);
//    init();
// });

// window.addEventListener("mouseout", function () {
//    mouse.x = undefined;
//    mouse.y = undefined;
// });

// init();
// animate();

// function init() {
//    particlesArray = [];
//    let numberOfParticles = (canvas.height * canvas.width) / 9000;
//    for (let i = 0; i < numberOfParticles; i++) {
//       let size = (Math.random() * 5) + 1;
//       let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
//       let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
//       let directionX = (Math.random() * 5) - 2.5;
//       let directionY = (Math.random() * 5) - 2.5;
//       let color = "#8C5523";

//       particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
//    }
// }

// function connect() {
//    let opacityValue = 1;
//    for (let a = 0; a < particlesArray.length; a++) {
//       for (let b = a; b < particlesArray.length; b++) {
//          let distance = Math.pow(particlesArray[a].x - particlesArray[b].x, 2) + Math.pow(particlesArray[a].y - particlesArray[b].y, 2);
//          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
//             opacityValue = 1 - (distance / 20000);
//             ctx.strokeStyle = 'rgba(140,85,31,' + opacityValue + ')';
//             ctx.lineWidth = 1;
//             ctx.beginPath();
//             ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
//             ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
//             ctx.stroke();
//          }

//       }
//    }
// }

// function animate() {
//    requestAnimationFrame(animate);
//    ctx.clearRect(0, 0, innerWidth, innerHeight);

//    for (let i = 0; i < particlesArray.length; i++) {
//       particlesArray[i].update();
//    }
//    connect();
// }

// window.addEventListener('resize', function () {
//    canvas.width = innerWidth;
//    canvas.height = innerHeight;
//    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
//    init();
// })

// window.addEventListener('mouseout', function () {
//    mouse.x = undefined;
//    mouse.y = undefined;
// })

// init();
// animate();
