export default class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  maxSize: number;
  img: HTMLImageElement | null;

  constructor({
    x,
    y,
    directionX,
    directionY,
    size,
    img = null
  }: {
    x: number;
    y: number;
    directionX: number;
    directionY: number;
    size: number;
    img?: HTMLImageElement;
  }) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.maxSize = size;
    this.img = img;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.img) ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = "#33FF00";
      ctx.fill();
    }
  }

  update(
    canvas: { width: number; height: number },
    ctx: CanvasRenderingContext2D,
  ) {
    // boundary collision
    if (this.x > canvas.width - this.size + 5) {
      this.directionX = -Math.abs(this.directionX);
    }
    if (this.x < -this.size / 4) {
      this.directionX = Math.abs(this.directionX);
    }
    if (this.y > canvas.height - this.size + 5) {
      this.directionY = -Math.abs(this.directionY);
    }
    if (this.y < -this.size / 4) {
      this.directionY = Math.abs(this.directionY);
    }

    this.x = this.x + this.directionX;
    this.y = this.y + this.directionY;
    if (!this.img) this.flicker();
    this.draw(ctx);
  }

  flicker() {
    const radius = this.maxSize / 4 + (Math.random() * this.maxSize * 3 / 4)
    this.size = radius;
  }
}