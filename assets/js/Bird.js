class Bird extends RoundObject {
  constructor() {
    super(
      Bird.getDefaultPosition(),
      Vector.getZeroVector(),
      Bird.getDefaultAcceleration(),
      BIRD_MASS,
      BIRD_RADIUS,
      createImage(IMAGE_RED),
    );
    this.state = BIRD_STATE.WAITING;
  }

  static getDefaultPosition = () => new Vector(BIRD_X, BIRD_Y);
  static getDefaultAcceleration = () => new Vector(BIRD_D2X, BIRD_D2Y);

  charge() {
    this.hasCharged = true;
  }

  launch(launchVelocity) {
    this.state = BIRD_STATE.FLIGHT;
    this.velocity = launchVelocity;
  }

  checkHalted() {
    if (this.velocity.x < 0.05 && this.velocity.y < 0.05) {
      this.state = BIRD_STATE.HALTED;
    }
  }

  handleMovement() {
    this.move();
    this.checkHalted();
  }

  static generateBirds(n = BIRDS_QTY) {
    const birds = [];

    for (let i = 0; i < n; i++) {
      birds.push(new Bird());
    }

    return birds;
  }
}
