class Slingshot extends StaticObject {
  constructor() {
    super(
      new Vector(SLINGSHOT_X, SLINGSHOT_Y),
      SLINGSHOT_WIDTH,
      SLINGSHOT_HEIGHT,
      createImage(IMAGE_SLINGSHOT),
    );

    this.bird = null;
    this.canvasEl = null;
    this.relaxPos = new Vector(SLINGSHOT_RELAX_X, SLINGSHOT_RELAX_Y);
    this.stretchAngle = 0;
    this.stretchLength = 0;
    this.maxStretchLength = SLINGSHOT_MAX_LENGTH;
  }

  mouseMoveHandler(e) {
    e = e || window.event;

    const { bird, canvasEl } = this;
    const birdSize = {
      width: bird.radius,
      height: bird.radius,
    }

    bird.charge();
    const mousePos = getMousePos(canvasEl, e, birdSize);

    if (getDistanceBetween(mousePos, this.relaxPos) < this.maxStretchLength) {
      bird.position.x = mousePos.x;
      bird.position.y = mousePos.y;
    }
  }

  charge(canvasEl, bird) {
    this.canvasEl = canvasEl;
    this.bird = bird;
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
  }

  static getLaunchAngle(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p1.y - p2.y;

    const angle = Math.atan2(dy, dx);
    return angle;
  }

  static getVelocityComponents(velocity, angle) {
    return {
      x: velocity * Math.cos(angle),
      y: - velocity * Math.sin(angle),
    };
  }

  static getLaunchVelocity(p1, p2) {
    const x = getDistanceBetween(p1, p2);
    const angle = Slingshot.getLaunchAngle(p1, p2);
    const velocity = Math.sqrt((2 * HOOKES_CONSTANT * x * x) / BIRD_MASS);
    const velocityComponents = Slingshot.getVelocityComponents(velocity, angle);

    return velocityComponents;
  }

  release(bird) {
    document.removeEventListener('mousemove', this.mouseMoveHandler);

    const launchVelocity = Slingshot.getLaunchVelocity(bird.position, this.relaxPos);

    bird.launch(launchVelocity);
  }
}
