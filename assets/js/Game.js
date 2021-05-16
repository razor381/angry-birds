class Game {
  constructor() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;

    this.entities = {
      bg: StaticObject.createBackground(),
      slingshot: new Slingshot(),
      bird: Bird.generateBirds()[0],
    };

    this.gameLoop();
  }

  gameLoop() {
    this.addClickListener();

    (function animate() {

      this.entities.bird.move();
      this.render(this.ctx);

      const isBirdDone = this.entities.bird.isDone();

      !isBirdDone && requestAnimationFrame(animate.bind(this));
    }.bind(this))();
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    Game.renderEntities(ctx, Object.values(this.entities));
  }

  addClickListener() {
    document.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.entities.bird.launch();
    })
  }

  static renderEntities(ctx, entities = []) {
    entities.forEach((entity) => Game.renderEntity(ctx, entity));
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
