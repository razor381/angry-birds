class Loader {
  constructor(main) {
    this.ctx = main.ctx;
    this.main = main;

    this.init();
  }

  init() {
    this.loadingScreen = Utils.getEl(CLASS_LOADING_SCREEN);
    this.loadingScreenText = Utils.getEl(CLASS_LOADING_TEXT);

    this.hasSoundLoaded = false;
    this.hasPicturesLoaded = false;

    Sound.loadTracks(this);
    Picture.loadPictures(this);
  }

  splashScreenClickHandler = () => {
    this.removeListeners();
    this.loadingScreen.classList.add(CLASS_HIDDEN);
    this.main.gameState = GAME_STATES.MENU;
  }

  removeListeners() {
    this.loadingScreen.removeEventListener('click', this.loadingScreen);
  }

  handleResourcesLoaded() {
    this.loadingScreenText.textContent = LOADED_TEXT;
    this.loadingScreen.addEventListener('click', this.splashScreenClickHandler);
  }

  render() {
    this.loadingScreen.classList.remove(CLASS_HIDDEN);
    this.loadingScreenText.textContent = NOT_LOADED_TEXT;

    if (this.hasSoundLoaded && this.hasPicturesLoaded) {
      this.handleResourcesLoaded();
    }
  }
}
