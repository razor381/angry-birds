class Bird extends RoundObject {
  constructor(position, subtype) {
    super(
      position,
      BIRD_MASS,
      BIRD_RADIUS,
      BIRD_STATE.WAITING,
      Utils.getSubtypeImage(subtype),
      ENTITY_TYPE.BIRD,
    );
    this.subtype = subtype;
  }

  static getReadyPosition = () => new Point(LOADED_BIRD_X, LOADED_BIRD_Y);

  getReady() {
    this.position = Bird.getReadyPosition();
    this.state = BIRD_STATE.READY
  }

  charge() {
    this.hasCharged = true;
  }

  launch(launchVelocity) {
    this.state = BIRD_STATE.FLIGHT;
    this.velocity = launchVelocity;
  }

  haltBird = () => {
    this.state = BIRD_STATE.HALTED;
  }

  checkHalted() {
    // if bird comes to rest, ie velocity is negligible
    if (Math.abs(this.velocity.x) < 0.3 && Math.abs(this.velocity.y) < 0.3) {
      setTimeout(this.haltBird, 1000);
    }
  }

  handleMovement() {
    this.move();
    this.checkHalted();
  }
}
