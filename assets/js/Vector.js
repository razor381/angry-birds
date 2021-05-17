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

  static getDistanceBetween(p1, p2) {
    const xDiff = p2.x - p1.x;
    const yDiff = p2.y - p1.y;

    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  }

  static getAngle(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p1.y - p2.y;

    const angle = Math.atan2(dy, dx);

    return angle;
  }

  static getLaunchVelocity(x) {
    return Math.sqrt((2 * HOOKES_CONSTANT * x * x) / BIRD_MASS);
  }

  static getComponents(magnitude, angle) {
    return new Vector(magnitude * Math.cos(angle), -magnitude * Math.sin(angle));
  }

  static calculateVelocity(p1, p2) {
    const
      x = Vector.getDistanceBetween(p1, p2),
      angle = Vector.getAngle(p1, p2),
      velocity = Vector.getLaunchVelocity(x);

    return Vector.getComponents(velocity, angle);
  }
}
