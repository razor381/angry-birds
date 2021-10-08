class Menu {
  constructor(main) {
    this.main = main;
    this.ctx = main.ctx;

    this.init();
  }

  init() {
    this.isSoundPlaying = false;
    this.isSoundMuted = false;
    this.menuScreen = Utils.getEl(CLASS_MENU_SCREEN);
    this.startButton = Utils.getEl(CLASS_START_BTN);
    this.buildButton = Utils.getEl(CLASS_BUILD_BTN);
    this.muteButton = Utils.getEl(CLASS_MUTE_BTN);

    this.buildClickHandler.bind(this);
  }

  render() {
    this.menuScreen.classList.remove(CLASS_HIDDEN);
    if (!this.isSoundPlaying && !this.isSoundMuted) {
      Sound.play(THEME);
      this.isSoundPlaying = true;
    }

    this.muteButton.addEventListener('click', this.muteButtonClickHandler);
    this.startButton.addEventListener('click', this.gameStartHandler);
    this.buildButton.addEventListener('click', this.buildClickHandler);
  }

  muteSound = () => {
    Sound.stop(THEME);

    if (!(this.muteButton.classList.contains(CLASS_DARKENED))) {
      this.muteButton.classList.add(CLASS_DARKENED);
    }
  };

  unMuteSound = () => {
    Sound.play(THEME)

    if (this.muteButton.classList.contains(CLASS_DARKENED)) {
      this.muteButton.classList.remove(CLASS_DARKENED);
    }
  };

  muteButtonClickHandler = () => {
    this.isSoundMuted = !this.isSoundMuted;

    this.isSoundMuted
      ? this.muteSound()
      : this.unMuteSound();
  };

  gameStartHandler = () => {
    this.isSoundPlaying = false;
    Sound.play(BUTTON);

    this.removeListeners();
    this.menuScreen.classList.add(CLASS_HIDDEN);
    this.main.gameState = GAME_STATES.LEVEL_SELECTION;
  }

  removeListeners() {
    this.muteButton.removeEventListener('click', this.muteButtonClickHandler);
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
