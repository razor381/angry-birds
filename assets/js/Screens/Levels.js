class Levels {
  constructor(main) {
    this.main = main;
    this.ctx = main.ctx;
    this.isInitialized = false;
  }

  init() {
    this.levelCards = [];
    this.levelsScreen = Utils.getEl(CLASS_LEVELS_SCREEN);
    this.levelsListing = Utils.getEl(CLASS_LEVELS_LISTING);
    this.backButton = Utils.getEl(CLASS_LEVELS_BACK_BTN);

    Levels
      .getLevelsDataFromLocal()
      .then((data) => {
        this.main.levelsData = data;
        this.createLevelCards();
      })
      .catch((err) => Utils.throwErr(LOCAL_READ_ERR, err));
  }

  render() {
    if (!this.isInitialized) {
      this.init();
      this.isInitialized = true;
    }

    if (this.levelsScreen.classList.contains(CLASS_HIDDEN)) {
      this.levelsScreen.classList.remove(CLASS_HIDDEN);
    }

    this.backButton.addEventListener('click', this.backButtonClickHandler);
    this.addLevelsSelectionListener();
  }

  getLevelstars(starsNumber) {
    const starImages = [];

    if (!starsNumber) {
      for (let i = 0; i < TOTAL_STARS_NUMBER; i++) {
        starImages.push(Picture.getPicture(IMAGE_SMALL_STAR_OFF, true));
      }
    } else {
      for (let i = 0; i < starsNumber; i++) {
        starImages.push(Picture.getPicture(IMAGE_SMALL_STAR, true));
      }
    }

    return starImages;
  }

  addStarElements(parentElement, levelData) {
    const starElements = this.getLevelstars(levelData.stars);

    starElements.forEach((el) => parentElement.appendChild(el));
  }

  createLevelCard(levelData) {
    const levelElement = Utils.createNewElement(TAG_LI, [CLASS_LEVEL]);
    const levelNumberElement = Utils.createNewElement(TAG_DIV, [CLASS_LEVEL_NUMBER]);
    const levelStarsElement = Utils.createNewElement(TAG_DIV, [CLASS_LEVEL_STARS]);

    levelNumberElement.textContent = levelData.level;
    this.addStarElements(levelStarsElement, levelData);

    levelElement.appendChild(levelNumberElement);
    levelElement.appendChild(levelStarsElement);

    return levelElement;
  }

  createLevelCards() {
    const levelsElement = Utils.createNewElement(TAG_UL, [CLASS_LEVELS]);
    const levels = LevelCard.getLevelCards(this.main.levelsData);

    levels.forEach((level) => {
      const levelCardElement = this.createLevelCard(level);
      levelCardElement.dataset.levelData = level.level;
      this.levelCards.push(levelCardElement);
      levelsElement.appendChild(levelCardElement);
    });

    this.levelsListing.innerHTML = '';
    this.levelsListing.appendChild(levelsElement);
  }

  backButtonClickHandler = () => {
    Sound.play(BUTTON);

    this.hideLevelScreen();
    this.main.gameState = GAME_STATES.MENU;
  }

  levelClickHandler = (e) => {
    Sound.stop(THEME);
    Sound.play(BUTTON);

    this.hideLevelScreen();
    this.main.gamePlayLevel = +e.target.dataset.levelData;
    this.main.gameState = GAME_STATES.PLAYING;
    this.isInitialized = false;
  }

  addLevelsSelectionListener() {
    this.levelCards.forEach((card) => {
      card.addEventListener('click', this.levelClickHandler);
    });
  }

  hideLevelScreen() {
    this.levelsScreen.classList.add(CLASS_HIDDEN);
  }

  static getLevelIndexFromArray(arr, level) {
    return arr.findIndex((el) => el.level === level);
  }

  static async getLevelsDataFromLocal() {
    return JSON.parse(Utils.getFromLocal(LEVELS_RECORDS_KEY)).data;
  }

  static updateLevelsDataToLocal(scores) {
    Utils.saveToLocal(LEVELS_RECORDS_KEY, JSON.stringify({ data: scores }));
  }
}
