class Main {
  constructor() {
    this.init();
  }

  init() {
    this.canvas = new Canvas(this);
    this.ctx = this.canvas.ctx;
    this.gameState = GAME_STATES.RESULTS;
    this.fps = new FrameThrottler(this, TARGET_FPS);
    this.loader = new Loader(this);
    this.game = new Game(this);
    this.menu = new Menu(this);
    this.levels = new Levels(this);
    this.results = new Results(this);
    // this.animateId = undefined;
    // this.start();

    this.runGame.bind(this);

    this.runGame();
  }

  runGame(time) {
    this.clearScreen();

    switch(this.gameState) {
      case GAME_STATES.LOADING:
        this.loader.render();
        break;

      case GAME_STATES.MENU:
        this.menu.render();
        break;

      case GAME_STATES.LEVEL_SELECTION:
        this.levels.render();
        break;

      case GAME_STATES.PLAYING:
        break;

      case GAME_STATES.RESULTS:
        this.results.render();
        break;
    }

    window.requestAnimationFrame(this.runGame.bind(this));
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  }

  // loop(time) {
  //   if (this.fps.shouldRenderNextFrame(time)) {
  //     this.runGame();
  //     this.start();
  //   }
  // }

  // start() {
  //   if (!this.animateId) {
  //     this.animateId = window.requestAnimationFrame(this.loop.bind(this));
  //   }
  // }

  // stop() {
  //   if (this.animateId) {
  //     window.cancelAnimationFrame(this.animateId);
  //     this.animateId = undefined;
  //   }
  // }
}
