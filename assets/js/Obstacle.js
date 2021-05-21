class Obstacle extends Base {
  constructor(position, width, height) {
    super(
      position,
      Vector.getZeroVector(),
      Vector.getDefaultAcceleration(),
      BLOCK_MASS,
      Utils.createImage(IMAGE_BLOCK),
    );

    this.width = width;
    this.height = height;
  }

  getStationaryVertices() {
    const cornerPoints = [];

    cornerPoints.push(this.position);
    cornerPoints.push(new Point(this.position.x + this.width, this.position.y));
    cornerPoints.push(new Point(this.position.x + this.width, this.position.y + this.height));
    cornerPoints.push(new Point(this.position.x, this.position.y + this.height));

    return cornerPoints;
  }

  getVertices() {
    const stationaryVertices = this.getStationaryVertices();
    return this.hasRotated ? this.getRotatedVertices(stationaryVertices) : stationaryVertices;
  }

  getRotatedVertices(vertices) {
    return vertices.map((vertex) => {
      const translatedPoint = Point.subtract(this.getCenter(), vertex);
      const rotatedPoint = Point.rotatePoint(translatedPoint, this.angle)
      const unTranslatedPoint = Point.add(this.getCenter(), rotatedPoint);

      return unTranslatedPoint;
    });
  }

  static generateBlocks() {
    const blocks = [];

    const startPos = new Point(400, 20);

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 3; j++) {
        blocks.push(
          new Obstacle(
            Point.add(startPos, new Point(i * 40, j * 45)),
            BLOCK_WIDTH,
            BLOCK_HEIGHT,
          )
        );
      }
    }

    return blocks;
  }
}
