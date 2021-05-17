class Slingshot extends StaticObject {
  constructor(canvas) {
    super(
      new Vector(SLINGSHOT_X, SLINGSHOT_Y),
      SLINGSHOT_WIDTH,
      SLINGSHOT_HEIGHT,
      createImage(IMAGE_SLINGSHOT),
    );

    this.canvas = canvas;
    this.birds = Bird.generateBirds();
    this.activeBird = null;
    this.canvasEl = null;
    this.relaxPos = new Vector(SLINGSHOT_RELAX_X, SLINGSHOT_RELAX_Y);
    this.stretchAngle = 0;
    this.stretchLength = 0;
    this.maxStretchLength = SLINGSHOT_MAX_LENGTH;

    this.addClickListener();
  }

  addClickListener() {
    document.addEventListener('mousedown', (e) => {
      e.preventDefault();

      if (this.activeBird) {
        switch (this.activeBird.state) {
          case BIRD_STATE.READY:
            this.charge();
            break;
          case BIRD_STATE.CHARGED:
            this.release();
            break;
          default:
        }
      }
    })
  }

  loadBird() {
    this.activeBird = this.birds.pop();
    this.activeBird.state = BIRD_STATE.READY;
  }

  isEmpty() {
    return !!this.birds.length;
  }

  mouseChargeHandler(e) {
    const mousePos = getMousePos(this.canvas.el, e);

    const { activeBird: { position, radius } } = this;

    if (Vector.getDistanceBetween(mousePos, this.relaxPos) < this.maxStretchLength) {
      position.x = mousePos.x - radius / 2;
      position.y = mousePos.y - radius / 2;
    }
  }

  charge() {
    this.activeBird.state = BIRD_STATE.CHARGED;
    this.mouseChargeCallback = this.mouseChargeHandler.bind(this);
    document.addEventListener('mousemove', this.mouseChargeCallback);
  }

  release() {
    this.activeBird.state = BIRD_STATE.FLIGHT;
    document.removeEventListener('mousemove', this.mouseChargeCallback);
    const launchVelocity = Vector.calculateVelocity(this.activeBird.position, this.relaxPos);
    this.activeBird.launch(launchVelocity);
  }
}
