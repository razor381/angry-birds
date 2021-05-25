class Pig extends RoundObject {
  constructor(position, subtype) {
    super(
      position,
      PIG_MASS,
      PIG_RADIUS,
      PIG_STATE.RESTING,
      Utils.getSubtypeImage(subtype),
      ENTITY_TYPE.ENEMY,
    );

    this.subtype = subtype;
  }
}
