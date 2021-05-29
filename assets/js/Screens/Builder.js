const BUILDER_TYPE_CLASS_MAPPER = {
  ENEMY: Pig,
  OBSTACLE: Obstacle,
};

const DEFAULT_SELECTED = ENTITY_SUBTYPE.WOOD;

class Builder {
  constructor(main) {
    this.main = main;
    this.canvas = main.canvas;
    this.ctx = main.ctx;
    this.isGameInitialized = false;
  }

  init() {
    this.clickables = {};
    this.entities = {};
    this.seeder = {};
    /**
     * selectedEntity schema: {
     *    element,
     *    type,
     *    subtype,
     * }
     */
    this.selectedEntity = {};
    this.birdCounter = {
      RED: 0,
      CHUCK: 0,
    }

    this.isGameInitialized = true;
    this.isMovementEnabled = false;


    /**
     * Activate cursor in dev mode to build levels
     */
    // this.setCursor();
    this.queryDomElements();
    this.activateControlButtons();
    this.activateTools();
    this.initGameObjects();
    this.updateBirdCounter();
  }

  initGameObjects() {
    this.background = StaticObject.createBackground();
    this.slingshot = new Slingshot(this.canvas, null, true);
    this.entities = Utils.copyObject(BUILDER_ENTITIES_SCHEMA);
    this.seeder = Utils.copyObject(BUILDER_SEEDER_SCHEMA);
  }

  render() {
    if (!this.isGameInitialized) {
      this.init();
    }

    if (this.isMovementEnabled) {
      this.moveEntities();
      this.checkEntitesCollision();
    }

    this.draw();
  }

  setCursor() {
    this.cursor = new Obstacle(new Point(400, 400), ENTITY_SUBTYPE.ICE);
    document.addEventListener('mousemove', (e) => {
      const pos = Utils.getMousePos(this.canvas.el, e);
      this.cursor.setPosition(pos);
      this.cursor.adjustPositionToCenter();
    });
  }

  getEntitiesArray() {
    return Utils.flattenObjectToArray(this.entities);
  }

  checkEntitesCollision() {
    const entitiesArray = this.getEntitiesArray();

    for (let i = 0; i < entitiesArray.length - 1; i++) {
      for (let j = i + 1; j < entitiesArray.length; j++) {
        if (i != j) {
          const collisionStats = Collision.isColliding(entitiesArray[i], entitiesArray[j]);

          if (collisionStats.isColliding) {
            this.addReactionToEntities(collisionStats, entitiesArray[i], entitiesArray[j]);
          }
        }
      }
    }
  }

  addReactionToEntities(stats, entity1, entity2) {
    entity1.velocity = stats.shape1.reactionVector;
    entity2.velocity = stats.shape2.reactionVector;
  }

  activateTools() {
    this.unhideButtons();
    this.activateDefaultTool();
    this.addToolSelectionListeners();
    this.addPlaceEntityListener();
  }

  activateDefaultTool() {
    this.selectTool(this.clickables[DEFAULT_SELECTED].element);
  }

  queryDomElements() {
    this.builderButtonsElement = Utils.getEl(CLASS_BUILDER_BUTTONS);
    this.redCountElement = Utils.getEl(CLASS_BUILDER_RED_NUM);
    this.chuckCountElement = Utils.getEl(CLASS_BUILDER_CHUCK_NUM);

    this.startButton = Utils.getEl(CLASS_BUILDER_START_BUTTON);
    this.resetButton = Utils.getEl(CLASS_BUILDER_RESET_BUTTON);
    this.exitButton = Utils.getEl(CLASS_BUILDER_EXIT_BUTTON);
    this.movementButton = Utils.getEl(CLASS_BUILDER_MOVEMENT_BUTTON);

    Object.keys(BUILDER_BUTTON_TYPE_MAPPER).forEach((key) => {
      const { idSelector, type } = BUILDER_BUTTON_TYPE_MAPPER[key];
      const element = Utils.getEl(idSelector);

      this.clickables[key] = { element, type };
    });
  }

  isClickWithinBoundary({ x, y }) {
    return (y > BUILDER_TOP_BOUNDARY) && (x > BUILDER_LEFT_BOUNDARY);
  }

  placeEntityHandler = (e) => {
    e.preventDefault();

    let placementPosition = Utils.getMousePos(this.canvas.el, e);

    if (this.isClickWithinBoundary(placementPosition)) {

      // snap to grid of predefined height and width of block
      placementPosition = new Point(
        Math.ceil(placementPosition.x / BLOCK_WIDTH) * BLOCK_WIDTH,
        Math.ceil(placementPosition.y / BLOCK_HEIGHT) * BLOCK_HEIGHT,
      );

      this.createEntity(placementPosition);
    }
  };

  createEntity(position) {
    const { type, subtype } = this.selectedEntity;

    const newEntity = new BUILDER_TYPE_CLASS_MAPPER[type](position, subtype);
    newEntity.adjustPositionToCenter();

    Sound.play(subtype, true);
    this.entities[type].push(newEntity);
    this.addEntityToSeeder(type, subtype, position);
  }

  addEntityToSeeder(type, subtype, position) {
    this.seeder[TYPE_SEEDER_MAPPER[type]].push({ subtype, position });
  }

  entityButtonClickHandler = (e) => {
    e.preventDefault();

    this.selectTool(e.target);
  };

  selectTool(element) {
    const clickedItem = this.findItemUsingElement(element);

    if (clickedItem.type === ENTITY_TYPE.BIRD) {
      this.handleBirdClicked(clickedItem);
      return;
    }

    Sound.play(BUTTON, true);
    this.activateStyling(element);
    this.selectedEntity = clickedItem;
  }

  handleBirdClicked({ subtype }) {
    Sound.play(BIRD_SELECT, true);
    this.seeder.birds.push({ subtype });
    this.birdCounter[subtype]++;
    this.updateBirdCounter();
  }

  updateBirdCounter() {
    this.redCountElement.textContent = this.birdCounter.RED;
    this.chuckCountElement.textContent = this.birdCounter.CHUCK;
  }

  activateStyling(element) {
    if (this.selectedEntity.element) {
      this.selectedEntity.element.classList.remove(CLASS_BUILDER_ACTIVE);
    }
    element.classList.add(CLASS_BUILDER_ACTIVE);
  }

  findItemUsingElement(element) {
    const clickedKey = Object.keys(this.clickables).find((key) => {
      return this.clickables[key].element.id === element.id;
    });

    return {
      subtype: clickedKey,
      type: this.clickables[clickedKey].type,
      element,
    };
  }

  draw() {
    const toRender = [
      this.background,
      this.slingshot,
      ...this.getEntitiesArray(),
    ];

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    toRender.forEach((entity) => entity.render(this.ctx));
  }

  moveEntities() {
    this.getEntitiesArray().forEach((obj) => obj.move());
  }

  addToolSelectionListeners() {
    Object.values(this.clickables).forEach(({ element }) => {
      element.addEventListener('click', this.entityButtonClickHandler);
    });
  }

  addPlaceEntityListener() {
    document.addEventListener('click', this.placeEntityHandler);
  }

  cleanup() {
    this.removeListeners();
    this.selectedEntity.element.classList.remove(CLASS_BUILDER_ACTIVE);
    this.movementButton.classList.remove(CLASS_BUILDER_MOVEMENT_ACTIVE);
  }

  removeListeners() {
    document.removeEventListener('click', this.placeEntityHandler);
    this.startButton.removeEventListener('click', this.startHandler);
    this.resetButton.removeEventListener('click', this.resetHandler);
    this.exitButton.removeEventListener('click', this.exitHandler);
  }

  startHandler = (e) => {
    e.preventDefault();

    Sound.play(BUTTON);

    if (this.isLevelEmpty()) return;

    this.cleanup();
    this.hideButtons();
    this.main.gamePlayLevel = CUSTOM_GAME_LEVEL;
    this.main.gameState = GAME_STATES.PLAYING;
    this.main.seederObject = this.seeder;
    this.isGameInitialized = false;
  }

  isLevelEmpty() {
    return (!this.seeder.birds.length || !this.seeder.pigs.length);
  }

  resetHandler = (e) => {
    e.preventDefault();

    Sound.play(BUTTON);
    this.cleanup();
    this.isGameInitialized = false;
  }

  exitHandler = (e) => {
    e.preventDefault();

    Sound.play(BUTTON);
    this.cleanup();
    this.hideButtons();
    this.main.gameState = GAME_STATES.MENU;
    this.isGameInitialized = false;
  }

  movementToggleHandler = (e) => {
    e.preventDefault();

    Sound.play(BUTTON);
    this.toggleMovementButtonActiveStatus();
    this.isMovementEnabled = !this.isMovementEnabled;
  }

  toggleMovementButtonActiveStatus() {
    this.movementButton.classList.toggle(CLASS_BUILDER_MOVEMENT_ACTIVE);
  }

  activateControlButtons() {
    this.startButton.addEventListener('click', this.startHandler);
    this.resetButton.addEventListener('click', this.resetHandler);
    this.exitButton.addEventListener('click', this.exitHandler);
    this.movementButton.addEventListener('click', this.movementToggleHandler);
  }

  unhideButtons() {
    this.builderButtonsElement.classList.remove(CLASS_HIDDEN);
  }

  hideButtons() {
    this.builderButtonsElement.classList.add(CLASS_HIDDEN);
  }
}
