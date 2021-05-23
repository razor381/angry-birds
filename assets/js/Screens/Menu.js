class Menu {
  constructor(main) {
    this.main = main;
    this.ctx = main.ctx;

    this.init();
  }

  init() {
    this.menuScreen = Utils.getEl(CLASS_MENU_SCREEN);
    this.startButton = Utils.getEl(CLASS_START_BTN);
    this.buildButton = Utils.getEl(CLASS_BUILD_BTN);

    this.buildClickHandler.bind(this);
  }

  render() {
    this.menuScreen.classList.remove(CLASS_HIDDEN);

    this.startButton.addEventListener('click', this.gameStartHandler);
    this.buildButton.addEventListener('click', this.buildClickHandler);
  }

  gameStartHandler = (e) => {
    this.removeListeners();
    this.menuScreen.classList.add(CLASS_HIDDEN);
    this.main.gameState = GAME_STATES.LEVEL_SELECTION;
  }

  removeListeners() {
    this.startButton.removeEventListener('click', this.gameStartHandler);
    this.buildButton.removeEventListener('click', this.buildClickHandler);
  }

  buildClickHandler = (e) => {

  }
}
