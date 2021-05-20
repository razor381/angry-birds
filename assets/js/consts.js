const
  TAG_BODY = 'body',
  TAG_CANVAS = 'canvas',

  CLASS_CANVAS = 'canvas',
  CLASS_BIRD = 'bird',

  TARGET_FPS = 24,

  BASE_MASS = 40,
  BASE_ANGLE = 0,
  DEFAULT_D2X = 0,
  DEFAULT_D2Y = 0.3,

  BIRD_DX = 5,
  BIRD_DY = -15,
  BIRD_MASS = 30,
  BIRD_RADIUS = 25,
  BIRDS_QTY = 2,
  BIRD_STATE = {
    WAITING: 'WAITING',
    READY: 'READY',
    CHARGED: 'CHARGED',
    FLIGHT: 'FLIGHT',
    HALTED: 'HALTED',
  },

  PIG_MASS = 100,
  PIG_RADIUS = 50,
  PIG_STATE = {
    RESTING: 'RESTING',
  },

  BLOCK_MASS = 40,
  BLOCK_WIDTH = 82,
  BLOCK_HEIGHT = 80,

  SLINGSHOT_X = 80,
  SLINGSHOT_WIDTH = 60,
  SLINGSHOT_HEIGHT = 110,
  SLINGSHOT_MAX_LENGTH = 100,
  SLINGSHOT_DEFAULT_ANGLE = 0,
  SLINGSHOT_DEFAULT_STRETCH_LENGTH = 0,

  HOOKES_CONSTANT = 0.4,
  COLLISION_OBJECT_SCHEMA = {
    min: {
      value: Number.MAX_VALUE,
      point: 0,
    },
    max: {
      value: -Number.MAX_VALUE,
      point: 0,
    },
    distances: [],
  }

  GROUND_HEIGHT = 80,

  DAMPING_X = 0.58,
  DAMPING_Y = 0.4,
  MIN_JUMP_VELOCITY = 0.9,

  IMAGE_RED = '/assets/img/red.png',
  IMAGE_PIG = '/assets/img/pig.png',
  IMAGE_BLOCK = '/assets/img/hollow-block.png',
  IMAGE_SLINGSHOT = '/assets/img/slingshot.png',
  IMAGE_BACKGROUND = '/assets/img/background.jpeg',

  DEFAULT_WINDOW_WIDTH = 1024,
  DEFAULT_WINDOW_HEIGHT = 576;

const GROUND_Y = DEFAULT_WINDOW_HEIGHT - GROUND_HEIGHT;

const SLINGSHOT_Y = GROUND_Y - SLINGSHOT_HEIGHT;
const SLINGSHOT_RELAX_X = SLINGSHOT_X;
const SLINGSHOT_RELAX_Y = SLINGSHOT_Y;

const BIRD_X = SLINGSHOT_RELAX_X;
const BIRD_Y = SLINGSHOT_RELAX_Y;

