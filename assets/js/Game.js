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
    this.pig = new Pig(new Point(700, GROUND_Y-PIG_RADIUS));
    this.block = new Obstacle(new Point(400, GROUND_Y-BLOCK_HEIGHT), BLOCK_WIDTH, BLOCK_HEIGHT);
    this.block4 = new Obstacle(new Point(350, GROUND_Y-3*BLOCK_HEIGHT), BLOCK_WIDTH, BLOCK_HEIGHT);
  }

  play() {
    (function animate(newTime) {
      this.shouldRender && requestAnimationFrame(animate.bind(this));

      if (this.fps.shouldRenderNextFrame(newTime)) {

        this.block.stickToMouse(this.canvas);

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
        console.log(Collision.checkCollision(this.block, this.block4));

      }
    }.bind(this))();
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const toRender = [
      this.background,
      this.slingshot,
      this.block4,
      this.block,
      this.pig,
      this.slingshot.activeBird,
    ];

    toRender.forEach((entity) => Game.renderEntity(this.ctx, entity));
  }

  static renderEntity(ctx, entity) {
    ctx.save();
    ctx.beginPath();
    !entity.isRound ?
      ctx.drawImage(
        entity.image,
        entity.position.x,
        entity.position.y,
        entity.width,
        entity.height,
      ) :
      ctx.drawImage(
        entity.image,
        entity.position.x - entity.radius,
        entity.position.y - entity.radius,
        entity.radius * 2,
        entity.radius * 2,
      )

    ctx.closePath();
    ctx.restore();
  }
}
