class Game {
  constructor(main) {
    this.main = main;
    this.canvas = main.canvas;
    this.ctx = main.ctx;
    this.gameState = main.gameState;
  }

  reset() {
    this.isGameInitialized = false;
    this.isLoading = true;
    this.maxScore = 0;
    this.pigsKilled = 0;
    this.playerScore = 0;
  }

  init() {
    Sound.play(GAME_START);
    this.isPaused = false;
    this.gameLevel = this.main.gamePlayLevel;
    this.queryDomElements();
    this.activatePauseButton();
    this.initGameObjects();
    this.isGameInitialized = true;
  }

  queryDomElements() {
    this.pauseButton = Utils.getEl(CLASS_PAUSE_BTN);
    this.pauseCard = Utils.getEl(CLASS_PAUSE_SCREEN);
    this.resumeButton = Utils.getEl(CLASS_RESUME_BTN);
    this.restartButton = Utils.getEl(CLASS_RESTART_BTN);
    this.exitButton = Utils.getEl(CLASS_EXIT_BTN);
  }

  async initGameObjects() {
    this.background = StaticObject.createBackground();
    this.entities = await Generator.generateGameEntities(this.gameLevel);
    this.slingshot = new Slingshot(this.canvas, this.entities);
    this.isLoading = false;

    this.setupScoreBoard();
  }

  setupScoreBoard() {
    this.maxScore = this.calculateMaxScore();
    this.maxPigsNumber = this.getPigsNumber();
  }

  getPigsNumber() {
    return this.entities.pigs.length;
  }

  calculateMaxScore() {
    const scoreEntites = [
      ...this.entities.pigs,
      ...this.entities.blocks,
    ];

    return scoreEntites.reduce((acc, entity) => {
      return acc + SCORE_SUBTYPE_MAPPER[entity.subtype];
    }, 0);
  }

  activatePauseButton() {
    this.pauseButton.classList.remove(CLASS_HIDDEN);
    this.pauseButton.addEventListener('click', this.pauseClickHandler);
  }

  render() {
    if (!this.isGameInitialized) {
      this.reset();
      this.init();
    }

    if (this.isLoading) return;

    if (!this.isPaused) {
      this.moveGameObjects();
      this.checkEntitesCollision();

      switch(this.slingshot.activeBird.state) {
        case BIRD_STATE.WAITING:
          break;
        case BIRD_STATE.READY:
          break;
        case BIRD_STATE.FLIGHT:
          this.moveActiveBird();
          break;
        case BIRD_STATE.HALTED:
          this.handleBirdHalted();
          break;
      }
    }

    this.draw();
  }

  moveActiveBird() {
    this.slingshot.activeBird.handleMovement();
  }

  reloadSlingshot() {
    this.resetPigsVulnerability();
    this.slingshot.handleBirdLoading(this.entities);
  }

  resetPigsVulnerability() {
    this.entities.pigs.forEach((pig) => pig.makeVulnerable());
  }

  handleBirdHalted() {
    this.checkHasGameEnded();
    this.reloadSlingshot();
  }

  checkHasGameEnded() {
    if (this.checkAllEnemyKilled()) {
      this.exitGame(GAME_WON);
      return;
    }

    if (this.slingshot.isBirdsEmpty()) {
      this.exitGame(GAME_LOST);
      return;
    }
  }

  checkAllEnemyKilled() {
    return !this.entities.pigs.length;
  }

  checkEntitesCollision() {
    const entitiesArray = Utils.flattenObjectToArray(this.entities);

    for (let i = 0; i < entitiesArray.length - 1; i++) {
      for (let j = i + 1; j < entitiesArray.length; j++) {
        if (i != j) {
          const collisionStats = Collision.isColliding(entitiesArray[i], entitiesArray[j]);

          if (collisionStats.isColliding) {
            this.resolveCollision(collisionStats, entitiesArray[i], entitiesArray[j]);
          }
        }
      }
    }
  }

  identifyEntities(entity1, entity2) {
    const bird = entity1.type === ENTITY_TYPE.BIRD ? entity1 : entity2;
    const notBird = entity1.type === ENTITY_TYPE.BIRD ? entity2 : entity1;

    return  { bird, notBird };
  }

  resolveCollision(stats, entity1, entity2) {
    // collisions involving birds
    if (entity1.type === ENTITY_TYPE.BIRD || entity2.type === ENTITY_TYPE.BIRD) {

      // avoid interaction between two birds
      if (entity1.type === entity2.type) return;

      const { bird, notBird } = this.identifyEntities(entity1, entity2);

      this.playCollisionsound(notBird.subtype);
      this.showCollisionAnimation(entity1, stats);

      // when bird hits pig
      if (notBird.type === ENTITY_TYPE.ENEMY) {
        this.handleBirdHitPig(notBird);
        return;
      }

      this.destroyNotBirdEntity(notBird);
      // this.addNegativeImpulse(bird);
      this.updateScores(notBird);

      return;
    }

    this.addReactionToEntities(stats, entity1, entity2);
  }

  playCollisionsound(subtype) {
    Sound.play(subtype, true);
  }

  handleBirdHitPig(pig) {
    if (pig.canBlockHit) return;

    pig.takeHit();
    if (pig.isDead()) {
      Sound.play(PIG_KILLED, true);
      this.destroyNotBirdEntity(pig);
      this.updateScores(pig);
    }
  }

  addNegativeImpulse(bird) {
    bird.velocity = Vector.divideVector(bird.velocity, 1.5);
  }

  destroyNotBirdEntity(entity) {
    this.entities[ENTITY_KEY_MAPPER[entity.type]] =
        Utils.deleteFromArray(this.entities[ENTITY_KEY_MAPPER[entity.type]], [entity]);
  }

  showCollisionAnimation(entity, stats) {
    const collisionPoint = Point.add(
      entity.position,
      stats.shape1.collisionPoint,
    );

    Animator.showCollisionAt(collisionPoint);
  }

  updateScores(entity) {
    this.playerScore += SCORE_SUBTYPE_MAPPER[entity.subtype];
    this.pigsKilled = this.maxPigsNumber - this.getPigsNumber();
  }

  addReactionToEntities(stats, entity1, entity2) {
    entity1.velocity = stats.shape1.reactionVector;
    entity2.velocity = stats.shape2.reactionVector;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawVisualEntities();
    this.slingshot.drawSlingshotRubber(this.ctx);
    this.drawAnimations();
    this.displayScoreBoard();
  }

  displayScoreBoard() {
    this.setScoreFontStyle(this.ctx);
    this.displayScore(this.ctx);
    this.displayPigsLeft(this.ctx);
  }

  setScoreFontStyle(ctx) {
    ctx.font = SCORE_TEXT.font;
    ctx.fillStyle = FONT_FILL_COLOR;
    ctx.strokeStyle = FONT_OUTLINE_COLOR;
  }

  displayScore(ctx) {
    const scoreText = `SCORE - ${this.playerScore}/${this.maxScore}`;

    ctx.fillText(scoreText, SCORE_TEXT.position.x, SCORE_TEXT.position.y);
    ctx.strokeText(scoreText, SCORE_TEXT.position.x, SCORE_TEXT.position.y);
  }

  displayPigsLeft(ctx) {
    const pigsNumberText = `PIGS - ${this.pigsKilled}/${this.maxPigsNumber}`;

    ctx.fillText(pigsNumberText, SCORE_TEXT.position.x, SCORE_TEXT.position.y + 60);
    ctx.strokeText(pigsNumberText, SCORE_TEXT.position.x, SCORE_TEXT.position.y + 60);
  }

  drawVisualEntities() {
    const toRender = [
      this.background,
      this.slingshot,
      ...this.slingshot.trajectoryPoints,
    ];

    const toAnimate = Utils.flattenObjectToArray(this.entities);

    toRender.forEach((entity) => entity.render(this.ctx));
    toAnimate.forEach((entity) => entity.animator.animate(this.ctx));
  }

  drawAnimations() {
    Animator.showCollisionAnimations(this.ctx);
    Animator.showSmokeAnimations(this.ctx);
  }

  moveGameObjects() {
    const movables = [
      ...this.entities.pigs,
      ...this.entities.blocks
    ];

    movables.forEach((obj) => obj.move());
  }

  pauseClickHandler = () => {
    Sound.play(BUTTON);
    this.isPaused = true;
    this.pauseButton.classList.add(CLASS_HIDDEN);
    this.showPauseCard();
  }

  resumeGame = () => {
    Sound.play(BUTTON);
    this.isPaused = false;
    this.pauseCard.classList.add(CLASS_HIDDEN);
    this.pauseButton.classList.remove(CLASS_HIDDEN);
  }

  restartGame = () => {
    Sound.play(BUTTON);
    this.isPaused = false;
    this.pauseCard.classList.add(CLASS_HIDDEN);
    this.pauseButton.classList.remove(CLASS_HIDDEN);
    this.isGameInitialized = false;
  }

  exitGame = (endStatus) => {
    Sound.play(BUTTON);
    this.pauseCard.classList.add(CLASS_HIDDEN);
    this.pauseButton.classList.add(CLASS_HIDDEN);
    this.main.playerScore = this.playerScore;
    this.main.maxScore =this.maxScore;
    this.main.gameState = GAME_STATES.RESULTS;
    this.main.gameEndStatus = endStatus;
    this.isGameInitialized = false;
  }

  showPauseCard() {
    this.pauseCard.classList.remove(CLASS_HIDDEN);
    this.resumeButton.addEventListener('click', this.resumeGame);
    this.restartButton.addEventListener('click', this.restartGame);
    this.exitButton.addEventListener('click', () => this.exitGame(GAME_LOST));
  }

}
