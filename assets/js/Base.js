class Base {
  constructor(position, velocity, acceleration, mass, image) {
    this.position = position;
    this.velocity = velocity
    this.mass = mass || BASE_MASS;
    this.angle = 0;
    this.acceleration = acceleration;
    this.isDestructible = false;
    this.image = image;
    this.isDescending = false;
  }

  move() {
    // topmost point of jump reached
    if (!this.isDescending && this.velocity.y >= 0) {
      this.isDescending = true;
    }

    // start bounce
    if (this.isDescending && this.position.y >= GROUND_Y) {

      const { x, y } = this.velocity;
      this.position.y = GROUND_Y;
      this.velocity.y = Base.isJumpNegligible(y) ? 0 : -y * DAMPING_Y;
      this.velocity.x = Base.isJumpNegligible(x) ? 0 : x * DAMPING_X;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  static isJumpNegligible(value) {
    return Math.abs(value) < MIN_JUMP_VELOCITY;
  }
}
