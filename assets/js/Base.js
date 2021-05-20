class Base {
  constructor(position, velocity, acceleration, mass, image, isRound = false) {
    this.position = position;
    this.velocity = velocity
    this.mass = mass || BASE_MASS;
    this.angle = BASE_ANGLE;
    this.acceleration = acceleration;
    this.isDestructible = false;
    this.image = image;
    this.isDescending = false;
    this.isRound = isRound;
  }

  setPosition(point) {
    const bottomEdge = point.y + this.getHeight();
    this.position.x = point.x;

    this.position.y = (bottomEdge > GROUND_Y) ? (GROUND_Y - this.getHeight()) : point.y;
  }

  move(x, y) {
    // topmost point of jump reached
    const bottomPosition = this.position.y + this.getHeight();

    if (!this.isDescending && this.velocity.y >= 0) {
      this.isDescending = true;
    }

    // start bounce
    if (this.isDescending && bottomPosition >= GROUND_Y) {

      const { x, y } = this.velocity;
      this.position.y = GROUND_Y - this.getHeight();
      this.velocity.y = Base.isJumpNegligible(y) ? 0 : -y * DAMPING_Y;
      this.velocity.x = Base.isJumpNegligible(x) ? 0 : x * DAMPING_X;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  getHeight() {
    return this.isRound ? this.radius : this.height;
  }

  static isJumpNegligible(value) {
    return Math.abs(value) < MIN_JUMP_VELOCITY;
  }
}
