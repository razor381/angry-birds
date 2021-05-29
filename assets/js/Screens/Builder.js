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
    this.isPaused = false;

    this.queryDomElements();
    this.activateTools();
    this.initGameObjects();
  }

  initGameObjects() {
    this.background = StaticObject.createBackground();
    this.slingshot = new Slingshot(this.canvas, null, true);
    this.entities ={ ...BUILDER_ENTITIES_SCHEMA };
    this.seeder = { ...BUILDER_SEEDER_SCHEMA };
  }

  render() {
    if (!this.isGameInitialized) {
      this.init();
    }

    if (!this.isPaused) {
      this.moveEntities();
      this.checkEntitesCollision();
    }

    this.draw();
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

    const placementPosition = Utils.getMousePos(this.canvas.el, e);

    if (this.isClickWithinBoundary(placementPosition)) {
      this.createEntity(placementPosition);
    }
  };

  createEntity(position) {
    const { type, subtype } = this.selectedEntity;

    const newEntity = new BUILDER_TYPE_CLASS_MAPPER[type](position, subtype);
    newEntity.adjustPositionToCenter();

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

    this.activateStyling(element);
    this.selectedEntity = clickedItem;
  }

  handleBirdClicked({ subtype }) {
    this.seeder.birds.push({ subtype });
    this.birdCounter[subtype]++;
    this.updateBirdCounter();
    console.log(this.seeder.birds);
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

  unhideButtons() {
    this.builderButtonsElement.classList.remove(CLASS_HIDDEN);
  }
}
