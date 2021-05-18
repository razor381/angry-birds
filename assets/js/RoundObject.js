class RoundObject extends Base {
  constructor(position, mass, radius, state, image) {
    super(
      position,
      Vector.getZeroVector(),
      Vector.getDefaultAcceleration(),
      mass,
      image
    );
    this.radius = radius;
    this.state = state;
  }

  isPointInside(point) {
    return this.radius > Vector.getDistanceBetween(point, this.position);
  }
}
