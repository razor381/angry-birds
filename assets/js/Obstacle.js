class Obstacle extends Base {
  constructor(position, width, height) {
    super(
      position,
      Vector.getZeroVector(),
      Vector.getZeroVector(),
      BLOCK_MASS,
      Utils.createImage(IMAGE_BLOCK),
    );

    this.width = width;
    this.height = height;
  }

  stickToMouse(canvas) {
    canvas.el.addEventListener('mousemove', (e) => {
      this.setPosition(Utils.getMousePos(canvas.el, e));
    });
  }

  getCornerPoints() {
    const cornerPoints = [];

    cornerPoints.push(this.position);
    cornerPoints.push(new Point(this.position.x + this.width, this.position.y));
    cornerPoints.push(new Point(this.position.x + this.width, this.position.y + this.height));
    cornerPoints.push(new Point(this.position.x, this.position.y + this.height));

    return cornerPoints;
  }
}
