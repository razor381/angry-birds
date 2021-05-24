class Game {
  constructor(main) {
    this.main = main;
    this.canvas = main.canvas;
    this.ctx = main.ctx;
    this.gameState = main.gameState;
    this.isGameInitialized = false;
    this.generator = new Generator();
  }

  init() {
    this.isPaused = false;
    this.pauseButton = Utils.getEl(CLASS_PAUSE_BTN);
    this.pauseCard = Utils.getEl(CLASS_PAUSE_SCREEN);
    this.resumeButton = Utils.getEl(CLASS_RESUME_BTN);
    this.restartButton = Utils.getEl(CLASS_RESTART_BTN);
    this.exitButton = Utils.getEl(CLASS_EXIT_BTN);
    this.entities = {};

    this.readyDomElements();
    this.initGameObjects();
  }

  initGameObjects() {
    this.background = StaticObject.createBackground();
    this.entities = this.generator.generateGameEntities();
    this.slingshot = new Slingshot(this.canvas, this.entities);
  }

  readyDomElements() {
    this.pauseButton.classList.remove(CLASS_HIDDEN);
    this.pauseButton.addEventListener('click', this.pauseClickHandler);
  }

  reset() {
    this.entities = {};
    this.isGameInitialized = true;
  }

  render() {
    if (!this.isGameInitialized) {
      this.reset();
      this.init();
    }

    if (!this.isPaused) {
      this.moveGameObjects();

      Collision.handleCollision(this.entities);

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
          const isBirdsFinished = this.slingshot.checkIsEmptyAndReload(this.entities);

          if (isBirdsFinished) {
            this.exitGame();
          }
          break;
      }
    }

    this.draw(this.ctx);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const toRender = [
      this.background,
      this.slingshot,
      ...Utils.flattenObjectToArray(this.entities),
    ];

    toRender.forEach((entity) => entity.render(this.ctx));
    Point.plotPoints(ctx);
  }

  moveGameObjects() {
    const movables = [
      ...this.entities.pigs,
      ...this.entities.blocks
    ];

    movables.forEach((obj) => obj.move());
  }

  pauseClickHandler = () => {
    this.isPaused = true;
    this.pauseButton.classList.add(CLASS_HIDDEN);
    this.showPauseCard();
  }

  resumeGame = () => {
    this.isPaused = false;
    this.pauseCard.classList.add(CLASS_HIDDEN);
    this.pauseButton.classList.remove(CLASS_HIDDEN);
  }

  restartGame = () => {
    this.isPaused = false;
    this.pauseCard.classList.add(CLASS_HIDDEN);
    this.pauseButton.classList.remove(CLASS_HIDDEN);
    this.isGameInitialized = false;
  }

  exitGame = () => {
    this.pauseCard.classList.add(CLASS_HIDDEN);
    this.pauseButton.classList.add(CLASS_HIDDEN);
    this.main.gameState = GAME_STATES.RESULTS;
    this.isGameInitialized = false;
  }

  showPauseCard() {
    this.pauseCard.classList.remove(CLASS_HIDDEN);
    this.resumeButton.addEventListener('click', this.resumeGame);
    this.restartButton.addEventListener('click', this.restartGame);
    this.exitButton.addEventListener('click', this.exitGame);
  }

}
