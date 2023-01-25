import { MouseObject } from "../components/IconEther";

export default class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
  img: HTMLImageElement;

  constructor({
    x,
    y,
    directionX,
    directionY,
    size,
    color,
    img
  }: {
    x: number;
    y: number;
    directionX: number;
    directionY: number;
    size: number;
    color: string;
    img: HTMLImageElement;
  }) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.img = img;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.img) ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color || "#9c5523";
      ctx.fill();
    }
  }

  update(
    canvas: { width: number; height: number },
    mouse: MouseObject,
    ctx: CanvasRenderingContext2D,
    { deterMouse = false } = {}
  ) {
    // boundary collision
    if (this.x > canvas.width - this.size / 2) {
      this.directionX = -Math.abs(this.directionX);
    }
    if (this.x < -this.size / 2) {
      this.directionX = Math.abs(this.directionX);
    }
    if (this.y > canvas.height - this.size / 2) {
      this.directionY = -Math.abs(this.directionY);
    }
    if (this.y < -this.size / 4) {
      this.directionY = Math.abs(this.directionY);
    }

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // move particles away from mouse
    if (distance < mouse.radius + this.size && deterMouse) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
      }
      this.x += 10;
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
    this.x = this.x + this.directionX;
    this.y = this.y + this.directionY;
    this.draw(ctx);
  }
}