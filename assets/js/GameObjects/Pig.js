class Pig extends RoundObject {
  constructor(position, subtype) {
    super(
      position,
      PIG_MASS,
      PIG_RADIUS,
      PIG_STATE.RESTING,
      Utils.createImage(IMAGE_PIG),
      ENTITY_TYPE.ENEMY,
    );

    this.subtype = subtype;
  }
}
