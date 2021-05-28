class Pig extends RoundObject {
  constructor(position, subtype) {
    super(
      position,
      PIG_MASS,
      PIG_RADIUS,
      PIG_STATE.HEALTHY,
      Utils.getSubtypeImage(subtype),
      ENTITY_TYPE.ENEMY,
      subtype,
    );

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
    Sound.play(this.subtype);
    this.state = PIG_STATE.INJURED;
    this.canBlockHit = true;
    this.hitsLeft -= 1;
  }

  isDead() {
    return this.hitsLeft <= 0;
  }
}
