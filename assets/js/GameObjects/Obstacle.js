class Obstacle extends Base {
  constructor(position, subtype) {
    super(
      position,
      Vector.getZeroVector(),
      Vector.getDefaultAcceleration(),
      BLOCK_MASS,
      Utils.getSubtypeImage(subtype),
      ENTITY_TYPE.OBSTACLE,
      subtype,
    );

    this.state = BLOCK_STATE.HEALTHY;
    this.width = BLOCK_WIDTH;
    this.height = BLOCK_HEIGHT;
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
}
