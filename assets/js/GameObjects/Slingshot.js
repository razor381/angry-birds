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
    this.trajectoryPoints =[];
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

  adjustToCenterPosition(position, isBelow = true) {
    const direction = isBelow ? -1 : 1;
    const offset = direction * this.activeBird.radius;

    return new Point(position.x + offset, position.y + offset);
  }

  getTrajectoryPathPoint(i, angle, launchVelocity) {
    const xCoordinate = i * (Projectile.isAimedBackwards(angle) ? -1 : 1);
    const yCoordinate = Projectile.getVerticalTrajectoryPosition(i, angle, launchVelocity);

    return new Point(xCoordinate, -yCoordinate);
  }

  getTrajectoryPathPoints() {
    const pointsToPlot = [];
    const { position: birdPosition } = this.activeBird;
    const launchVelocity = Projectile.getLaunchMagnitude(this.activeBird.position, this.relaxPos);
    const angle = Point.getAngle(this.activeBird.position, this.relaxPos);

    for (let i = TRAJECTORY_START_X; i <= TRAJECTORY_END_X; i += TRAJECTORY_POINTS_GAP) {
      const pathPoint = this.getTrajectoryPathPoint(i, angle, launchVelocity);

      pointsToPlot.push(this.adjustToCenterPosition(
        Point.add(birdPosition, pathPoint),
        false,
      ));
    }

    return pointsToPlot;
  }

  calculateTrajectoryPath() {
    this.trajectoryPoints =  this.getTrajectoryPathPoints();
  }

  birdPullbackHandler = (e) => {
    const mousePos = Utils.getMousePos(this.canvas.el, e);
    const mouseOffsetLength = Point.getDistanceBetween(mousePos, this.relaxPos);
    const isMouseInRange = mouseOffsetLength < this.maxStretchLength;

    this.activeBird.position = isMouseInRange
      ? this.adjustToCenterPosition(mousePos)
      : this.getMaxStretchedPosition(mousePos);

    this.calculateTrajectoryPath(e);
  }

  getMaxStretchedPosition(mousePos) {
    const getPointOnBoundary = this.getPointOnBoundary(mousePos);
    return this.adjustToCenterPosition(getPointOnBoundary);
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
    const point1 = this.activeBird.position;
    const point2 = this.relaxPos;

    const launchVelocityVector = Projectile.getLaunchVelocityVector(point1, point2);

    this.activeBird.launch(launchVelocityVector);
    document.removeEventListener('mousemove', this.birdPullbackHandler);
    this.activeBird.state = BIRD_STATE.FLIGHT;
  }
}
