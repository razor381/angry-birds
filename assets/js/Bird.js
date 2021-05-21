class Bird extends RoundObject {
  constructor() {
    super(
      Bird.getDefaultPosition(),
      BIRD_MASS,
      BIRD_RADIUS,
      BIRD_STATE.WAITING,
      Utils.createImage(IMAGE_RED),
    );
  }

  static getDefaultPosition = () => new Point(BIRD_X, BIRD_Y);

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
    // this.checkHalted();
  }

  static generateBirds(n = BIRDS_QTY) {
    const birds = [];

    for (let i = 0; i < n; i++) {
      birds.push(new Bird());
    }

    return birds;
  }
}
