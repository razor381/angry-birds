class Bird extends RoundObject {
  constructor() {
    super(
      new Vector(BIRD_X, BIRD_Y),
      Bird.defaultBirdVelocity,
      Bird.defaultBirdAcceleration,
      BIRD_MASS,
      BIRD_RADIUS,
      createImage(IMAGE_RED),
    );
    this.isUsed = false;
  }

  static defaultBirdVelocity = new Vector(BIRD_DX, BIRD_DY);
  static defaultBirdAcceleration = new Vector(BIRD_D2X, BIRD_D2Y);

  static generateBirds(n = BIRDS_QTY) {
    const birds = [];

    for (let i = 0; i < n; i++) {
      birds.push(new Bird());
    }

    return birds;
  }

  launch() {
    this.velocity.dx = 5;
    this.velocity.dy = -5;
  }

  isDone(groundY) {
    return this.position.y >= GROUND_Y;
  }
}
