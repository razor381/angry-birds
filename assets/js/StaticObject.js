class StaticObject extends Base {
  constructor(position, width, height, image) {
    super(position, Vector.zeroVector, Vector.zeroVector, 0, image);
    this.width = width;
    this.height = height;
  }

  static createBackground() {
    return new StaticObject(
      Vector.zeroVector,
      DEFAULT_WINDOW_WIDTH,
      DEFAULT_WINDOW_HEIGHT,
      createImage(IMAGE_BACKGROUND),
    );
  }
}
