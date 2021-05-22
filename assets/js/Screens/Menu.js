class Menu {
  constructor(main) {
    this.ctx = main.ctx;
    this.gameState = main.gameState;

    this.init();
  }

  init() {
    this.menuScreen = Utils.getEl(CLASS_MENU_SCREEN);
    this.startButton = Utils.getEl(START_BTN);
    this.buildButton = Utils.getEl(BUILD_BTN);

    this.gameStartHandler.bind(this);
    this.buildClickHandler.bind(this);
  }

  render() {
    this.menuScreen.classList.remove(CLASS_HIDDEN);

    this.startButton.addEventListener('click', this.gameStartHandler);
    this.buildButton.addEventListener('click', this.buildClickHandler);
  }

  gameStartHandler(e) {
    this.gameState = GAME_STATES.LEVEL_SELECTION;
  }

  buildClickHandler(e) {

  }
}
