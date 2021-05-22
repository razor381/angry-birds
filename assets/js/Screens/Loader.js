class Loader {
  constructor(main) {
    this.ctx = main.ctx;
    this.gameState = main.gameState;

    this.init();
  }

  init() {

  }

  render() {

  }

  gameStartHandler(e) {
    this.gameState = GAME_STATES.MENU;
  }

  buildClickHandler(e) {

  }
}
