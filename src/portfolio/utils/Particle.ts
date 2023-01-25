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
    img = null,
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
      ctx.fillStyle = "#33FF00";
      ctx.fill();
    }
  }

  // TODO: a more interesting collission algo
  avoidCollision(pB: Particle) {
    const distance = ((pB.x - this.x) ** 2 + (pB.y - this.y) ** 2) ** 0.5;
    if (distance <= (this.size * 3) / 4 + (pB.size * 3) / 4) {
      this.flipX();
      pB.flipX();
      this.flipY();
      pB.flipY();
    }
  }

  flipX() {
    this.directionX *= -1;
  }
  flipY() {
    this.directionY *= -1;
  }

  update(
    canvas: { width: number; height: number },
    ctx: CanvasRenderingContext2D
  ) {
    // boundary collision
    if (this.x > canvas.width - this.size / 2 || this.x < this.size / 2) {
      this.directionX *= -1;
    }
    if (this.y > canvas.height - this.size / 2 || this.y < this.size / 2) {
      this.directionY *= -1;
    }

    this.x = this.x + this.directionX;
    this.y = this.y + this.directionY;
    if (!this.img) this.flicker();
    this.draw(ctx);
  }

  flicker() {
    const radius = this.maxSize / 4 + (Math.random() * this.maxSize * 3) / 4;
    this.size = radius;
  }
}
