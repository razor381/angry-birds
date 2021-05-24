class Results {
  constructor(main) {
    this.main = main;
    this.ctx = main.ctx;

    this.init();
  }

  init() {
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
  }

  render() {
    if (this.resultsScreen.classList.contains(CLASS_HIDDEN)) {
      this.setupResultsScreen();
      this.resultsScreen.classList.remove(CLASS_HIDDEN);
    }

    this.addButtonClickListeners();
  }

  addButtonClickListeners() {
    this.menuButton.addEventListener('click', this.menuButtonClickHandler);
    this.levelsButton.addEventListener('click', this.levelsButtonClickHandler);
  }

  setupResultsScreen() {
    this.setGameStatusTitle();
    this.setGameRankImage();
    this.setPlayerScore();
    this.setPlayerStars();
  }

  setGameRankImage() {
    const rankImage = Utils.createNewElement(TAG_IMG, [CLASS_RESULTS_RANK_IMG]);

    rankImage.src = (this.main.gameEndStatus === GAME_WON)
      ? IMAGE_RESULTS_WON
      : IMAGE_RESULTS_LOST;

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
    const starsAcquired = this.getNumberOfStarsAcquired();

    // achieved stars
    for (let i = 0; i < starsAcquired; i++) {
      starImages.push(Utils.createDomImage(IMAGE_STAR, CLASS_RESULTS_STAR));
    }

    // unachieved stars
    for (let i = 0; i < (TOTAL_STARS_NUMBER - starsAcquired); i++) {
      starImages.push(Utils.createDomImage(IMAGE_STAR_OFF, CLASS_RESULTS_STAR));
    }

    return starImages;
  }

  getNumberOfStarsAcquired() {
    const starThreshold = this.main.maxScore / TOTAL_STARS_NUMBER;
    return Math.floor(this.main.playerScore / starThreshold);
  }

  setGameStatusTitle() {
    this.resulstStatusElement.innerText = (this.main.gameEndStatus === GAME_WON)
      ? GAME_WON_TEXT
      : GAME_LOST_TEXT;
  }

  setPlayerScore() {
    this.resultsScoreElement.innerText = this.main.playerScore;
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
