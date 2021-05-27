class StaticObject extends Base {
  constructor(position, width, height, image, subtype) {
    super(
      position,
      Vector.getZeroVector(),
      Vector.getZeroVector(),
      0,
      image,
      ENTITY_TYPE.STATIC,
      subtype,
    );
    this.width = width;
    this.height = height;
  }

  static createBackground() {
    return new StaticObject(
      Point.getOrigin(),
      DEFAULT_WINDOW_WIDTH,
      DEFAULT_WINDOW_HEIGHT,
      Picture.getPicture(IMAGE_BACKGROUND),
      ENTITY_SUBTYPE.BACKGROUND,
    );
  }
}
