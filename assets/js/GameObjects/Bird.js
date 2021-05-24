class Bird extends RoundObject {
  constructor(position, type) {
    super(
      position,
      BIRD_MASS,
      BIRD_RADIUS,
      BIRD_STATE.WAITING,
      Utils.createImage(IMAGE_RED),
    );
    this.type = type;
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

  static generateBirds(n = BIRDS_QTY) {
    const birds = [];

    for (let i = 0; i < n; i++) {
      birds.push(new Bird());
    }

    return birds;
  }
}
