class Main {
  constructor() {
    this.init();
  }

  init() {
    this.canvas = new Canvas(this);
    this.ctx = this.canvas.ctx;
    this.gameState = GAME_STATES.MENU;
    this.fps = new FrameThrottler(this, TARGET_FPS);
    this.loader = new Loader(this);
    this.game = new Game(this);
    this.menu = new Menu(this);
    this.results = new Results(this);
    this.animateId = undefined;

    this.start();
  }

  runGame() {
    this.clearScreen();

    switch(this.gameState) {
      case GAME_STATES.LOADING:
        this.loader.render();
        break;

      case GAME_STATES.MENU:
        this.menu.render();
        break;

      case GAME_STATES.PLAYING:
        break;

      case GAME_STATES.RESULTS:
        break;
    }
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  loop(time) {
    if (this.fps.shouldRenderNextFrame(time)) {

      this.runGame();
      this.start();
    }
  }

  start() {
    if (!this.animateId) {
      this.animateId = window.requestAnimationFrame(this.loop.bind(this));
    }
  }

  stop() {
    if (this.animateId) {
      window.cancelAnimationFrame(this.animateId);
      this.animateId = undefined;
    }
  }


}
