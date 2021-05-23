class Results {
  constructor(main) {
    this.main = main;
    this.ctx = main.ctx;

    this.init();
  }

  init() {
    this.resultsScreen = Utils.getEl(CLASS_RESULTS_SCREEN);
    this.menuButton = Utils.getEl(CLASS_RESULTS_MENU_BTN);
    this.levelsButton = Utils.getEl(CLASS_RESULTS_LEVELS_BTN);
  }

  render() {
    if (this.resultsScreen.classList.contains(CLASS_HIDDEN)) {
      this.resultsScreen.classList.remove(CLASS_HIDDEN);
    }

    this.menuButton.addEventListener('click', this.menuButtonClickHandler);
    this.levelsButton.addEventListener('click', this.levelsButtonClickHandler);
  }

  menuButtonClickHandler = () => {
    this.hideResultsScreen();
    this.main.gameState = GAME_STATES.MENU;
  }

  levelsButtonClickHandler = () => {
    this.hideResultsScreen();
    this.main.gameState = GAME_STATES.LEVEL_SELECTION;
  }

  hideResultsScreen() {
    this.resultsScreen.classList.add(CLASS_HIDDEN);
  }
}
