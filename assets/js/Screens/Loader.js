class Loader {
  constructor(main) {
    this.main = main;
  }

  async init() {
    this.loadingScreen = Utils.getEl(CLASS_LOADING_SCREEN);
    this.loadingScreenText = Utils.getEl(CLASS_LOADING_TEXT);

    this.hasSoundLoaded = false;
    this.hasPicturesLoaded = false;
    this.hasJsonLoaded = false;

    try {
      await Sound.loadTracks(this);
      await Picture.loadPictures(this);

      /**
       * @TODO refactor to separate json loader/handler class
       */
      await this.loadJson();
    } catch (err) {
      Utils.throwErr(LOAD_RESOURCES_ERR, err);
    }
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

  async loadJson() {
    const localLevelData = Utils.getFromLocal(LEVELS_RECORDS_KEY);

    if (!localLevelData) {
      const levelsData = await Utils.loadJson(PATH_SEEDER_LVLS_DATA);
      const levesDataString = JSON.stringify({ data: levelsData });
      Utils.saveToLocal(LEVELS_RECORDS_KEY, levesDataString);
    }

    this.hasJsonLoaded = true;
  }

  render() {
    this.loadingScreen.classList.remove(CLASS_HIDDEN);
    this.loadingScreenText.textContent = NOT_LOADED_TEXT;

    if (
      this.hasSoundLoaded &&
      this.hasPicturesLoaded &&
      this.hasJsonLoaded
    ) {
      this.handleResourcesLoaded();
    }
  }
}
