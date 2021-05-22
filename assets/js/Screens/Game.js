class Game {
  constructor(main) {
    this.canvas = main.canvas;
    this.ctx = main.ctx;
    this.gameState = main.gameState;

    this.init();
  }

  init() {
    this.shouldRender = true;
    this.fps = new FrameThrottler(TARGET_FPS, this.ctx);

    this.initGameObjects();
    this.play();
  }

  initGameObjects() {
    this.background = StaticObject.createBackground();
    this.birds = Bird.generateBirds();
    this.slingshot = new Slingshot(this.canvas, this.birds);

    this.pigs = Pig.generatePigs();
    this.blocks = Obstacle.generateBlocks();

    this.collidableObjects = [
      this.slingshot.activeBird,
      ...this.pigs,
      ...this.blocks,
    ];
  }

  play() {

    (function animate(newTime) {
      this.shouldRender && requestAnimationFrame(animate.bind(this));

      if (this.fps.shouldRenderNextFrame(newTime)) {

        this.moveGameObjects();

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
      this.slingshot.activeBird,
      ...this.blocks,
      ...this.pigs,
    ];

    toRender.forEach((entity) => entity.render(this.ctx));
    Point.plotPoints(ctx);
    this.fps.renderFPS(ctx);
  }

  moveGameObjects() {
    const movables = [...this.pigs, ...this.blocks];

    movables.forEach((obj) => obj.move());
  }
}
