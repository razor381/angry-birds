class Bird extends RoundObject {
  constructor() {
    super(
      Bird.getDefaultPosition(),
      Vector.getZeroVector(),
      Vector.getZeroVector(),
      BIRD_MASS,
      BIRD_RADIUS,
      createImage(IMAGE_RED),
    );
    this.isShot = false;
    this.hasCharged = false;
  }

  static getDefaultPosition = () => new Vector(BIRD_X, BIRD_Y);
  static defaultVelocity = () => new Vector(BIRD_DX, BIRD_DY);
  static defaultAcceleration = () => new Vector(BIRD_D2X, BIRD_D2Y);

  charge() {
    this.hasCharged = true;
  }

  reset() {
    this.isShot = false;
    this.hasCharged = false;
    this.position = Bird.defaultPosition();
    this.velocity = Vector.getZeroVector();
    this.acceleration = Vector.getZeroVector();
  }

  launch(launchVelocity) {
    this.isShot = true;
    this.velocity = launchVelocity || Bird.defaultVelocity();
    this.acceleration = Bird.defaultAcceleration();
  }

  isDone(groundY) {
    return this.isShot && (this.velocity.x < 0.05 && this.velocity.y < 0.05);
  }
}
