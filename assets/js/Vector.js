class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getMagnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  static getZeroVector() {
    return new Vector(0, 0);
  }

  static getNormal(point1, point2) {
    return new Vector(point2.y - point1.y,- point2.x + point1.x);
  }

  static getDefaultAcceleration() {
    return new Vector(DEFAULT_D2X, DEFAULT_D2Y);
  }

  static getLaunchVelocity(x) {
    return Math.sqrt((2 * HOOKES_CONSTANT * x * x) / BIRD_MASS);
  }

  static getComponents(magnitude, angle) {
    return new Vector(magnitude * Math.cos(angle), -magnitude * Math.sin(angle));
  }

  static getDotProduct(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y;
  }

  static calculateVelocity(p1, p2) {
    const
      x = Point.getDistanceBetween(p1, p2),
      angle = Point.getAngle(p1, p2),
      velocity = Vector.getLaunchVelocity(x);

    return Vector.getComponents(velocity, angle);
  }
}
