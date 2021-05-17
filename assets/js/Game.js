class Game {
  constructor() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.shouldRender = true;
    this.bg = StaticObject.createBackground();
    this.slingshot = new Slingshot(this.canvas);

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
