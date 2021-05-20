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

  getCornerPoints() {
    const cornerPoints = [];

    cornerPoints.push(this.position);
    cornerPoints.push(new Point(this.position.x + this.width, this.position.y));
    cornerPoints.push(new Point(this.position.x + this.width, this.position.y + this.height));
    cornerPoints.push(new Point(this.position.x, this.position.y + this.height));

    return cornerPoints;
  }

  static generateBlocks() {
    const blocks = [];

    for (let i = 0; i < 3; i++) {
      blocks.push(new Obstacle(new Point(400 + i * 120, 200 + i * 100), BLOCK_WIDTH, BLOCK_HEIGHT));
    }

    return blocks;
  }
}
