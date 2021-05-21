class Game {
  constructor() {
    this.init();
  }

  init() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.shouldRender = true;
    this.fps = new FrameThrottler(TARGET_FPS, this.ctx);

    this.initGameObjects();
    this.play();
  }

  initGameObjects() {
    this.background = StaticObject.createBackground();
    this.birds = Bird.generateBirds();
    this.slingshot = new Slingshot(this.canvas, this.birds);
    // this.pig = new Pig(new Point(700, GROUND_Y-4 * PIG_RADIUS));
    this.pig2 = new Pig(new Point(400, GROUND_Y-6 * PIG_RADIUS));
    // this.pig3 = new Pig(new Point(320, GROUND_Y-4 * PIG_RADIUS));
    this.block2 = new Obstacle(new Point(500, GROUND_Y - 3 * BLOCK_HEIGHT), BLOCK_WIDTH, BLOCK_HEIGHT);
    // this.block3 = new Obstacle(new Point(500, GROUND_Y - 2.6 * BLOCK_HEIGHT), BLOCK_WIDTH, BLOCK_HEIGHT);
    // this.block4 = new Obstacle(new Point(500, GROUND_Y - 3.9 * BLOCK_HEIGHT), BLOCK_WIDTH, BLOCK_HEIGHT);
    // this.block = new Obstacle(new Point(500, GROUND_Y - 5 * BLOCK_HEIGHT), BLOCK_WIDTH, BLOCK_HEIGHT);

    this.collidableObjects = [
      // this.pig,
      this.pig2,
      // this.pig3,
      // this.block,
      this.block2,
      // this.block3,
      // this.block4,
      // this.slingshot.activeBird,
    ];
  }

  play() {

    (function animate(newTime) {
      this.shouldRender && requestAnimationFrame(animate.bind(this));


      if (this.fps.shouldRenderNextFrame(newTime)) {

        this.block2.stickToMouse(this.canvas);
        // this.pig.stickToMouse(this.canvas);

        this.pig2.move();
        // this.block.move();
        // this.block2.move();

        Collision.addCollisionDetection(this.collidableObjects);
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
      // this.block,
      this.block2,
      // this.block3,
      // this.block4,
      // this.pig,
      this.pig2,
      // this.pig3,
      // this.slingshot.activeBird,
    ];

    toRender.forEach((entity) => entity.render(this.ctx));
    Point.plotPoints(ctx);
    // this.fps.renderFPS(ctx);
  }
}
