class StaticObject extends Base {
  constructor(position, width, height, image) {
    super(position, Vector.getZeroVector(), Vector.getZeroVector(), 0, image);
    this.width = width;
    this.height = height;
  }

  static createBackground() {
    return new StaticObject(
      Point.getOrigin(),
      DEFAULT_WINDOW_WIDTH,
      DEFAULT_WINDOW_HEIGHT,
      Utils.createImage(IMAGE_BACKGROUND),
    );
  }
}
