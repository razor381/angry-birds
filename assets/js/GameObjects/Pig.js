class Pig extends RoundObject {
  constructor(position, type) {
    super(
      position,
      PIG_MASS,
      PIG_RADIUS,
      PIG_STATE.RESTING,
      Utils.createImage(IMAGE_PIG),
    );

    this.type = type;
  }
}
