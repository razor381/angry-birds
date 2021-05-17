class Game {
  constructor() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.birds = this.generateBirds();

    this.entities = {
      bg: StaticObject.createBackground(),
      slingshot: new Slingshot(),
      bird: this.birds.pop(),
    };

    this.gameLoop();
  }

  gameLoop() {
    this.addClickListener();

    (function animate() {

      if (this.entities.bird.isShot) {
        this.entities.bird.move();
      }

      this.render(this.ctx);

      if (this.entities.bird.isDone()) {
        this.entities.bird = this.birds.pop();
      }

      this.entities.bird && requestAnimationFrame(animate.bind(this));
    }.bind(this))();
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    Game.renderEntities(ctx, Object.values(this.entities));
  }

  addClickListener() {
    document.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const { bird, slingshot } = this.entities;

      bird && !bird.hasCharged ?
        slingshot.charge(this.canvas.el, bird)
        : slingshot.release(bird);
    })
  }

  generateBirds(n = BIRDS_QTY) {
    const birds = [];

    for (let i = 0; i < n; i++) {
      birds.push(new Bird());
    }

    return birds;
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
