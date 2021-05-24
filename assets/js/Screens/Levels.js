class Levels {
  constructor(main) {
    this.main = main;
    this.ctx = main.ctx;

    this.init();
  }

  init() {
    this.levelCards = [];
    this.levelsScreen = Utils.getEl(CLASS_LEVELS_SCREEN);
    this.levelsListing = Utils.getEl(CLASS_LEVELS_LISTING);
    this.backButton = Utils.getEl(CLASS_LEVELS_BACK_BTN);
    this.levelsData = LevelClass.getLevelsData();

    this.createLevelCards();
  }

  render() {
    if (this.levelsScreen.classList.contains(CLASS_HIDDEN)) {
      this.levelsScreen.classList.remove(CLASS_HIDDEN);
    }

    this.backButton.addEventListener('click', this.backButtonClickHandler);
    this.addLevelsSelectionListener();
  }

  getLevelstars(starsNumber) {
    let stars = "";

    for (let i = 0; i < starsNumber; i++) {
      stars += (i === starsNumber-1) ? 'X' : 'X ';
    }

    return stars;
  }

  createLevelCard(levelData) {
    const levelElement = Utils.createNewElement(TAG_LI, [CLASS_LEVEL]);
    const levelNumberElement = Utils.createNewElement(TAG_DIV, [CLASS_LEVEL_NUMBER]);
    const levelStarsElement = Utils.createNewElement(TAG_DIV, [CLASS_LEVEL_STARS]);

    levelNumberElement.textContent = levelData.level;
    levelStarsElement.textContent = this.getLevelstars(levelData.stars);

    levelElement.appendChild(levelNumberElement);
    levelElement.appendChild(levelStarsElement);

    return levelElement;
  }

  createLevelCards() {
      const levelsElement = Utils.createNewElement(TAG_UL, [CLASS_LEVELS]);

      this.levelsData.forEach((level) => {
        const levelCardElement = this.createLevelCard(level);
        levelCardElement.dataset.levelData = level.level;
        this.levelCards.push(levelCardElement);
        levelsElement.appendChild(levelCardElement);
      });

      this.levelsListing.innerHTML = '';
      this.levelsListing.appendChild(levelsElement);
  }

  backButtonClickHandler = (e) => {
    this.hideLevelScreen();
    this.main.gameState = GAME_STATES.MENU;
  }

  levelClickHandler = (e) => {
    this.hideLevelScreen();
    this.main.gamePlayLevel = e.target.dataset.levelData;
    this.main.gameState = GAME_STATES.PLAYING;
  }

  addLevelsSelectionListener() {
    this.levelCards.forEach((card) => {
      card.addEventListener('click', this.levelClickHandler);
    });
  }

  hideLevelScreen() {
    this.levelsScreen.classList.add(CLASS_HIDDEN);
  }
}
