class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getMagnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  static add(v1, v2) {
    return new Vector(v2.x + v1.x, v2.y + v1.y);
  }

  static subtract(v1, v2) {
    return new Vector(v2.x - v1.x, v2.y - v1.y);
  }

  static getZeroVector() {
    return new Vector(0, 0);
  }

  static multiplyVector(vector, multiplier) {
    return new Vector(vector.x * multiplier, vector.y * multiplier);
  }

  static divideVector(vector, divider) {
    return new Vector(vector.x / divider, vector.y / divider);
  }

  static getNormal(point1, point2) {
    return new Vector(point2.y - point1.y,- point2.x + point1.x);
  }

  static getDefaultAcceleration() {
    return new Vector(DEFAULT_D2X, DEFAULT_D2Y);
  }

  static getComponents(magnitude, angle) {
    return new Vector(magnitude * Math.cos(angle), -magnitude * Math.sin(angle));
  }

  static getDotProduct(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y;
  }
}
