class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static getZeroVector() {
    return new Vector(0, 0);
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

  static calculateVelocity(p1, p2) {
    const
      x = Point.getDistanceBetween(p1, p2),
      angle = Point.getAngle(p1, p2),
      velocity = Vector.getLaunchVelocity(x);

    return Vector.getComponents(velocity, angle);
  }
}
