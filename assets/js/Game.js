class Game {
  constructor() {
    this.init();
  }

  init() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.shouldRender = true;
    this.fps = new FrameThrottler(TARGET_FPS);

    this.initGameObjects();
    this.play();
  }

  initGameObjects() {
    this.background = StaticObject.createBackground();
    this.birds = Bird.generateBirds();
    this.slingshot = new Slingshot(this.canvas, this.birds);
    this.pig = new Pig(new Point(700, GROUND_Y-4 * PIG_RADIUS));
    this.block = new Obstacle(new Point(400, GROUND_Y-BLOCK_HEIGHT), BLOCK_WIDTH, BLOCK_HEIGHT);
  }

  play() {
    (function animate(newTime) {
      this.shouldRender && requestAnimationFrame(animate.bind(this));

      if (this.fps.shouldRenderNextFrame(newTime)) {
        !this.slingshot.activeBird && this.slingshot.loadBird();
        const { activeBird } = this.slingshot;

        switch(this.slingshot.activeBird.state) {
          case BIRD_STATE.WAITING:
            break;
          case BIRD_STATE.READY:
            break;
          case BIRD_STATE.FLIGHT:
            activeBird.handleMovement();
            break;
          case BIRD_STATE.HALTED:
            this.shouldRender = false;
            break;
          default:
        }

        this.render(this.ctx);
      }
    }.bind(this))();
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const toRender = [
      this.background,
      this.slingshot,
      this.block,
      this.pig,
      this.slingshot.activeBird,
    ];

    toRender.forEach((entity) => entity.render(this.ctx));
  }
}
