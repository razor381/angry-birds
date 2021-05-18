class Game {
  constructor() {
    this.canvas = {};
    this.ctx = {};
    this.bg = {};
    this.slingshot = {};
    this.birds = [];
    this.shouldRender = true;

    this.pig = new Pig(new Vector(700, GROUND_Y - PIG_RADIUS / 2));
    this.block = new Obstacle(new Vector(400, GROUND_Y-BLOCK_HEIGHT/2.5), BLOCK_WIDTH, BLOCK_HEIGHT);
    this.block2 = new Obstacle(new Vector(400, GROUND_Y-3.5*BLOCK_HEIGHT/2.5), BLOCK_WIDTH, BLOCK_HEIGHT);

    this.init();
  }

  init() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.bg = StaticObject.createBackground();
    this.birds = Bird.generateBirds();
    this.slingshot = new Slingshot(this.canvas, this.birds);
    this.play();
  }

  play() {
    (function animate() {
      this.slingshot.isEmpty() && this.slingshot.loadBird();

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
      this.shouldRender && requestAnimationFrame(animate.bind(this));
    }.bind(this))();
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const toRender = [
      this.bg,
      this.slingshot,
      this.slingshot.activeBird,
      this.pig,
      this.block,
      this.block2,
    ];

    toRender.forEach((entity) => Game.renderEntity(this.ctx, entity));
  }

  static renderEntity(ctx, entity) {
    ctx.drawImage(
      entity.image,
      entity.position.x,
      entity.position.y,
      entity.width || entity.radius,
      entity.height || entity.radius,
    );
  }
}
