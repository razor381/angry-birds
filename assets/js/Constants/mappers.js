
const ENTITY_TYPE = {
  BIRD: 'BIRD',
  ENEMY: 'ENEMY',
  OBSTACLE: 'OBSTACLE',
  STATIC: 'STATIC',
};

const ENTITY_SUBTYPE = {
  RED: 'RED',
  CHUCK: 'CHUCK',
  ICE: 'ICE',
  WOOD: 'WOOD',
  STONE: 'STONE',
  ARMORED_PIG: 'ARMORED_PIG',
  UNARMORED_PIG: 'UNARMORED_PIG',
  SLINGSHOT: 'SLINGSHOT',
  BACKGROUND: 'BACKGROUND',
};

const ENTITY_KEY_MAPPER = {
  BIRD: 'birds',
  ENEMY: 'pigs',
  OBSTACLE: 'blocks',
};

const SCORE_SUBTYPE_MAPPER = {
  UNARMORED_PIG: 1000,
  ARMORED_PIG: 2000,
  WOOD: 200,
  STONE: 300,
  ICE: 100,
};

const LEVEL_SEED_MAPPER = {
  1: PATH_SEEDER_LVL_1,
  2: PATH_SEEDER_LVL_2,
  3: PATH_SEEDER_LVL_3,
  4: PATH_SEEDER_LVL_4,
  5: PATH_SEEDER_LVL_5,
};

const SUBTYPE_IMAGE_MAPPER = {
  RED: IMAGE_RED,
  CHUCK: IMAGE_CHUCK,
  ICE: IMAGE_ICE_BLOCK,
  WOOD: IMAGE_WOOD_BLOCK,
  STONE: IMAGE_STONE_BLOCK,
  ARMORED_PIG: IMAGE_PIG_ARMORED,
  UNARMORED_PIG: IMAGE_PIG,
};

const PIG_HP_MAPPER = {
  ARMORED_PIG: 2,
  UNARMORED_PIG: 1,
}

const SUBTYPE_SPRITE_MAPPER = {
  RED: getSpriteData(SPRITE_RED, 68, 62, 0, 0),
  CHUCK:getSpriteData(SPRITE_CHUCK, 72, 69, 0, 0),
  ICE: getSpriteData(SPRITE_ICE_BLOCK, 83, 83, 0, 0),
  WOOD: getSpriteData(SPRITE_WOOD_BLOCK, 82, 82, 0, 0),
  STONE: getSpriteData(SPRITE_STONE_BLOCK, 82, 80, 0, 0),
  ARMORED_PIG: getSpriteData(SPRITE_PIG_ARMORED, 95, 84, 0, 0),
  UNARMORED_PIG: getSpriteData(SPRITE_UNARMORED_PIG, 100, 100, 0, 0),
  SLINGSHOT: getSpriteData(SPRITE_RED, 64, 62, 0, 0),
  BACKGROUND: getSpriteData(SPRITE_RED, 64, 62, 0, 0),
};

const BUILDER_BUTTON_TYPE_MAPPER = {
  RED: {
    idSelector: ID_RED,
    type: ENTITY_TYPE.BIRD,
  },
  CHUCK: {
    idSelector: ID_CHUCK,
    type: ENTITY_TYPE.BIRD,
  },
  WOOD: {
    idSelector: ID_WOOD,
    type: ENTITY_TYPE.OBSTACLE,
  },
  ICE: {
    idSelector: ID_ICE,
    type: ENTITY_TYPE.OBSTACLE,
  },
  STONE: {
    idSelector: ID_STONE,
    type: ENTITY_TYPE.OBSTACLE,
  },
  UNARMORED_PIG: {
    idSelector: ID_UNARMORED_PIG,
    type: ENTITY_TYPE.ENEMY,
  },
  ARMORED_PIG: {
    idSelector: ID_ARMORED_PIG,
    type: ENTITY_TYPE.ENEMY,
  },
};

const TYPE_SEEDER_MAPPER = {
  OBSTACLE: 'blocks',
  ENEMY: 'pigs',
};

/**
 * @TODO refactor
 */
const TYPE_STATE_FRAME_MAPPER = {
  RED: {
    WAITING: { x: 68 * 0, y:0 },
    READY: { x: 68 * 0, y:0 },
    CHARGED: { x: 68 * 1, y:0 },
    FLIGHT: { x: 68 * 3, y:0 },
    HALTED: { x: 68 * 2, y:0 },
  },
  CHUCK: {
    WAITING: { x: 72 * 0, y:0 },
    READY: { x: 72 * 0, y:0 },
    CHARGED: { x: 72 * 1, y:0 },
    FLIGHT: { x: 72 * 3, y:0 },
    HALTED: { x: 72 * 2, y:0 },
  },
  ICE: {
    HEALTHY: { x: 0, y:0 },
    CRACKED: { x: 0, y:0 },
  },
  WOOD: {
    HEALTHY: { x: 0, y:0 },
    CRACKED: { x: 0, y:0 },
  },
  STONE: {
    HEALTHY: { x: 0, y:0 },
    CRACKED: { x: 0, y:0 },
  },
  ARMORED_PIG: {
    HEALTHY: { x: 0, y:0 },
    INJURED: { x: 95, y:0 },
  },
  UNARMORED_PIG: {
    HEALTHY: { x: 0, y:0 },
    INJURED: { x: 100, y:0 },
  },
};

/**
 * Get animation sprite data corresponding to entity subtype
 *
 * @param {String} sprite
 * @param {Number} frameWidth
 * @param {Number} frameHeight
 * @returns Object containing data for sprite animation
 */
function getSpriteData(sprite, frameWidth, frameHeight, frameX, frameY) {
  return {
    sprite,
    frameBox: {
      width: frameWidth,
      height: frameHeight,
    },
    framePos: {
      x: frameX,
      y: frameY,
    },
    stateMapper: {},
  };
}







