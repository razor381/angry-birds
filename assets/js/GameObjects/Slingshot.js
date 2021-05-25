class Slingshot extends StaticObject {
  constructor(canvas, entities) {
    super(
      new Point(SLINGSHOT_X, SLINGSHOT_Y),
      SLINGSHOT_WIDTH,
      SLINGSHOT_HEIGHT,
      Utils.createImage(IMAGE_SLINGSHOT),
    );

    this.canvas = canvas;
    this.birds = entities.birds;
    this.activeBird = null;
    this.relaxPos = new Point(SLINGSHOT_RELAX_X, SLINGSHOT_RELAX_Y);
    this.stretchAngle = SLINGSHOT_DEFAULT_ANGLE;
    this.stretchLength = SLINGSHOT_DEFAULT_STRETCH_LENGTH;
    this.maxStretchLength = SLINGSHOT_MAX_LENGTH;

    this.init(entities);
  }

  init(entities) {
    this.handleBirdLoading(entities);
    this.addStartBirdChargeHandler();
  }

  startBirdChargeHandler = (e) => {
    e.preventDefault();

    const mouseClickPos = Utils.getMousePos(this.canvas.el, e);

    if (this.activeBird) {
      switch (this.activeBird.state) {

        case BIRD_STATE.READY:
          if (this.activeBird.isPointWithin(mouseClickPos)) {
            this.charge();
          }
          break;

        case BIRD_STATE.CHARGED:
          this.release();
          break;
      }
    }
  }

  addStartBirdChargeHandler() {
    document.addEventListener('mousedown', this.startBirdChargeHandler);
  }

  handleBirdLoading(entities) {
    this.loadBird();
    entities.activeBird = this.activeBird;
  }

  loadBird() {
    if (this.birds.length) {
      this.activeBird = this.birds.pop();
      this.activeBird.getReady();
    }
  }

  isBirdsEmpty() {
    return !this.birds.length;
  }

  getCenterPosition(position) {
    return new Point(
      position.x - this.activeBird.radius / 2,
      position.y - this.activeBird.radius / 2,
    );
  }

  birdPullbackHandler = (e) => {
    const mousePos = Utils.getMousePos(this.canvas.el, e);

    if (Point.getDistanceBetween(mousePos, this.relaxPos) < this.maxStretchLength) {
      this.activeBird.position = this.getCenterPosition(mousePos);
      return;
    }

    this.getMaxStretchedPosition(mousePos);
  }

  getMaxStretchedPosition(mousePos) {
    const getPointOnBoundary = this.getPointOnBoundary(mousePos);
    this.activeBird.position = this.getCenterPosition(getPointOnBoundary);
  }

  getPointOnBoundary(mousePos) {
    const angle = Point.getAngle(this.relaxPos, mousePos);
    const components = Vector.getComponents(this.maxStretchLength, angle);

    return new Point(
      this.relaxPos.x + components.x,
      this.relaxPos.y + components.y,
    );
  }

  charge() {
    this.activeBird.state = BIRD_STATE.CHARGED;
    document.addEventListener('mousemove', this.birdPullbackHandler);
  }

  release() {
    this.activeBird.state = BIRD_STATE.FLIGHT;
    document.removeEventListener('mousemove', this.birdPullbackHandler);
    const launchVelocity = Vector.calculateVelocity(this.activeBird.position, this.relaxPos);
    this.activeBird.launch(launchVelocity);
  }
}
