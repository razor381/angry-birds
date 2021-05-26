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
    this.init();
  }

  init() {
    this.canBlockHit = false;
    this.hitsLeft = PIG_HP_MAPPER[this.subtype];
  }

  makeVulnerable() {
    this.canBlockHit = false;
  }

  takeHit() {
    this.canBlockHit = true;
    this.hitsLeft -= 1;
  }

  isDead() {
    return this.hitsLeft <= 0;
  }
}
