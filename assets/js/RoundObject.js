class RoundObject extends Base {
  constructor(position, mass, radius, state, image) {
    super(
      position,
      Vector.getZeroVector(),
      Vector.getDefaultAcceleration(),
      mass,
      image,
      true,
    );
    this.radius = radius;
    this.state = state;
  }

  getCenter() {
    return Point.add(this.position, new Point(this.radius, this.radius));
  }

  render(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(
      this.position.x + this.radius,
      this.position.y + this.radius,
    );
    ctx.rotate(Utils.toRadians(this.angle));
    ctx.drawImage(
      this.image,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2,
    )
    ctx.closePath();
    ctx.restore();
  }

  isPointWithin(point) {
    return this.radius > Point.getDistanceBetween(point, this.getCenter());
  }
}
