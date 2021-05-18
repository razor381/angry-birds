class Pig extends RoundObject {
  constructor(position) {
    super(
      position,
      PIG_MASS,
      PIG_RADIUS,
      PIG_STATE.RESTING,
      Utils.createImage(IMAGE_PIG),
    );
  }
}
