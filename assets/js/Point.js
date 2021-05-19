class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static getOrigin() {
    return new Point(0, 0);
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
}
