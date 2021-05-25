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

  checkHalted() {
    if (this.velocity.x < 0.01 && this.velocity.y < 0.01) {
      this.state = BIRD_STATE.HALTED;
    }
  }

  handleMovement() {
    this.move();
    this.checkHalted();
  }
}
