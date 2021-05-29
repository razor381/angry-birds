class Menu {
  constructor(main) {
    this.main = main;
    this.ctx = main.ctx;

    this.init();
  }

  init() {
    this.isSoundPlaying = false;
    this.menuScreen = Utils.getEl(CLASS_MENU_SCREEN);
    this.startButton = Utils.getEl(CLASS_START_BTN);
    this.buildButton = Utils.getEl(CLASS_BUILD_BTN);

    this.buildClickHandler.bind(this);
  }

  render() {
    this.menuScreen.classList.remove(CLASS_HIDDEN);
    if (!this.isSoundPlaying) {
      Sound.play(THEME);
      this.isSoundPlaying = true;
    }

    this.startButton.addEventListener('click', this.gameStartHandler);
    this.buildButton.addEventListener('click', this.buildClickHandler);
  }

  gameStartHandler = () => {
    this.isSoundPlaying = false;
    Sound.play(BUTTON);

    this.removeListeners();
    this.menuScreen.classList.add(CLASS_HIDDEN);
    this.main.gameState = GAME_STATES.LEVEL_SELECTION;
  }

  removeListeners() {
    this.startButton.removeEventListener('click', this.gameStartHandler);
    this.buildButton.removeEventListener('click', this.buildClickHandler);
  }

  buildClickHandler = () => {
    this.isSoundPlaying = false;
    Sound.stop(THEME);
    Sound.play(BUTTON);

    this.removeListeners();
    this.menuScreen.classList.add(CLASS_HIDDEN);
    this.main.gameState = GAME_STATES.BUILDING;
  }
}
