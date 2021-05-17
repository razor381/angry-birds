class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static getZeroVector() {
    return new Vector(0, 0);
  }
}
