class Base {
  constructor(position, velocity, acceleration, mass, image) {
    this.position = position;
    this.velocity = velocity
    this.mass = mass || BASE_MASS;
    this.angle = 0;
    this.acceleration = acceleration;
    this.isDestructible = false;
    this.image = image;
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }
}
