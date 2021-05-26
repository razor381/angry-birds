class Projectile {
  static getProjectileLaunchVelocity(x) {
    return Math.sqrt((2 * HOOKES_CONSTANT * x * x) / LAUNCH_MASS);
  }

  static isAimedBackwards(angle) {
    return Math.abs(angle) > (Math.PI / 2);
  }

  static getVerticalTrajectoryPosition(x, angle, u) {
    const firstPart = x * Math.tan(angle);
    const secondPart = (DEFAULT_D2Y * x * x) / (2 * u * u * Math.pow(Math.cos(angle), 2));

    // negating as y coordinate is inverted in canvas
    return -(firstPart - secondPart);
  }

  static getLaunchMagnitude(p1, p2) {
    const distance = Point.getDistanceBetween(p1, p2);
    return Projectile.getProjectileLaunchVelocity(distance);
  }

  static getLaunchVelocityVector(p1, p2) {
    const launchMagnitude = Projectile.getLaunchMagnitude(p1, p2);
    const angle = Point.getAngle(p1, p2);

    return Vector.getComponents(launchMagnitude, angle);
  }
}
