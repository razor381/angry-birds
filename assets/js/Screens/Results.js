class Results {
  constructor(main) {
    this.main = main;
    this.ctx = main.ctx;

    this.init();
  }

  init() {
    this.starsAcquired = undefined;
    this.queryDomElements();
  }

  queryDomElements() {
    this.resultsScreen = Utils.getEl(CLASS_RESULTS_SCREEN);
    this.resulstStatusElement = Utils.getEl(CLASS_RESULTS_STATUS);
    this.resultsScoreElement = Utils.getEl(CLASS_RESULTS_SCORE);
    this.resultsScoreStarsElement = Utils.getEl(CLASS_RESULTS_STARS);
    this.resultsRankElement = Utils.getEl(CLASS_RESULTS_RANK);
    this.menuButton = Utils.getEl(CLASS_RESULTS_MENU_BTN);
    this.levelsButton = Utils.getEl(CLASS_RESULTS_LEVELS_BTN);
    this.restartButton = Utils.getEl(CLASS_RESULTS_RESTART_BTN);
  }

  render() {
    if (this.resultsScreen.classList.contains(CLASS_HIDDEN)) {
      this.setupResultsScreen();
      this.resultsScreen.classList.remove(CLASS_HIDDEN);
      this.saveScores();
    }

    this.addButtonClickListeners();
  }

  saveScores() {
    const { playerScore, maxScore, gamePlayLevel, levelsData } = this.main;
    const levelIndex = Levels.getLevelIndexFromArray(levelsData, gamePlayLevel);
    const prevScoreObj = levelsData[levelIndex];

    if (playerScore <= prevScoreObj.achievedScore) return;

    levelsData[levelIndex] = {
      ...prevScoreObj,
      achievedScore: playerScore,
      stars: this.starsAcquired,
      totalScore: maxScore,
    };

    Levels.updateLevelsDataToLocal(levelsData);
  }

  addButtonClickListeners() {
    this.restartButton.addEventListener('click', this.restartButtonClickHandler);
    this.menuButton.addEventListener('click', this.menuButtonClickHandler);
    this.levelsButton.addEventListener('click', this.levelsButtonClickHandler);
  }

  setupResultsScreen() {
    this.playResultSound();
    this.setGameStatusTitle();
    this.setGameRankImage();
    this.setPlayerScore();
    this.setPlayerStars();
  }

  playResultSound() {
    Sound.play(this.main.gameEndStatus);
  }

  isGameWon() {
    return this.main.gameEndStatus === GAME_WON;
  }

  setGameRankImage() {
    const rankImage = Picture.getPicture(
      this.isGameWon() ? IMAGE_RESULTS_WON : IMAGE_RESULTS_LOST
    );

    this.resultsRankElement.innerHTML = '';
    this.resultsRankElement.appendChild(rankImage);
  }

  setPlayerStars() {
    this.resultsScoreStarsElement.innerHTML = '';

    this.getStarImages().forEach((img) => {
      this.resultsScoreStarsElement.append(img);
    });
  }

  getStarImages() {
    const starImages = [];
    this.starsAcquired = this.getNumberOfStarsAcquired();

    // achieved stars
    for (let i = 0; i < this.starsAcquired; i++) {
      starImages.push(Picture.getPicture(IMAGE_STAR, true));
    }

    // unachieved stars
    for (let i = 0; i < (TOTAL_STARS_NUMBER - this.starsAcquired); i++) {
      starImages.push(Picture.getPicture(IMAGE_STAR_OFF, true));
    }

    return starImages;
  }

  getNumberOfStarsAcquired() {
    const starThreshold = this.main.maxScore / TOTAL_STARS_NUMBER;
    return Math.floor(this.main.playerScore / starThreshold);
  }

  setGameStatusTitle() {
    this.resulstStatusElement.innerText = this.isGameWon()
      ? GAME_WON_TEXT
      : GAME_LOST_TEXT;
  }

  setPlayerScore() {
    this.resultsScoreElement.innerText = this.main.playerScore;
  }

  restartButtonClickHandler = () => {
    Sound.play(BUTTON);
    this.hideResultsScreen();
    this.main.gameState = GAME_STATES.PLAYING;
    Sound.stop(this.main.gameEndStatus);
  }

  menuButtonClickHandler = () => {
    Sound.play(BUTTON);

    this.hideResultsScreen();
    this.main.gameState = GAME_STATES.MENU;
    Sound.stop(this.main.gameEndStatus);
  }

  levelsButtonClickHandler = () => {
    Sound.play(BUTTON);
    this.hideResultsScreen();
    this.main.gameState = GAME_STATES.LEVEL_SELECTION;
    Sound.stop(this.main.gameEndStatus);
  }

  hideResultsScreen() {
    this.resultsScreen.classList.add(CLASS_HIDDEN);
  }
}
