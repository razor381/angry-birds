class Obstacle extends Base {
  constructor(position, width, height) {
    super(
      position,
      Vector.getZeroVector(),
      Vector.getZeroVector(),
      BLOCK_MASS,
      Utils.createImage(IMAGE_BLOCK),
    );

    this.width = width;
    this.height = height;
  }
}
