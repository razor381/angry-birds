const BIRD_DX = 5;
const BIRD_DY = -15;
const BIRD_MASS = 60;
const BIRD_RADIUS = 25;
const BIRDS_QTY = 2;
const BIRD_QUEUE_START = {
  x: 20,
  y: 400
};
const BIRD_QUEUE_GAP = 60;

const BASE_MASS = 40;
const BASE_ANGLE = 0;

const BLOCK_MASS = 20;
const BLOCK_WIDTH = 70;
const BLOCK_HEIGHT = 70;

const CLASS_CANVAS = 'canvas';
const CLASS_BIRD = 'bird';

const DAMPING_X = 0.18;
const DAMPING_Y = 0.4;

const DEFAULT_WINDOW_WIDTH = 1600;
const DEFAULT_WINDOW_HEIGHT = 720;

const DEFAULT_D2X = 0;
const DEFAULT_D2Y = 0.3;

const ENTITY_TYPE = {
  BIRD: 'BIRD',
  ENEMY: 'ENEMY',
  OBSTACLE: 'OBSTACLE',
  STATIC: 'STATIC',
};

const ENTITY_KEY_MAPPER = {
  BIRD: 'birds',
  ENEMY: 'pigs',
  OBSTACLE: 'blocks',
};

const FPS_COUNTER_FONT = '30px Arial';

const GROUND_HEIGHT = 100;


const HOOKES_CONSTANT = 0.8;

const IMAGE_RED = '/assets/img/red.png';
const IMAGE_PIG = '/assets/img/pig.png';
const IMAGE_BLOCK = '/assets/img/hollow-block.png';
const IMAGE_SLINGSHOT = '/assets/img/slingshot.png';
const IMAGE_BACKGROUND = '/assets/img/background.jpeg';

const MIN_JUMP_VELOCITY = 0.9;

const LAUNCH_MASS = 30;
const LEVELS_NUMBER = 5;
const LEVEL_ONE = 1;

const PIG_MASS = 10;
const PIG_RADIUS = 30;
const PIG_STATE = {
   RESTING: 'RESTING',
 };

 const PROJECTION_VECTORS_SCHEMA = {
  min: {
    value: Number.MAX_VALUE,
    point: 0,
  },
  max: {
    value: -Number.MAX_VALUE,
    point: 0,
  },
  distances: [],
};

const SLINGSHOT_X = 200;
const SLINGSHOT_WIDTH = 60;
const SLINGSHOT_HEIGHT = 110;
const SLINGSHOT_MAX_LENGTH = 100;
const SLINGSHOT_DEFAULT_ANGLE = 0;
const SLINGSHOT_DEFAULT_STRETCH_LENGTH = 0;

const TARGET_FPS = 60;

const TAG_BODY = 'body';
const TAG_CANVAS = 'canvas';
const TAG_DIV = 'div';
const TAG_UL = 'ul';
const TAG_LI = 'li';

// states


const BIRD_STATE = {
  WAITING: 'WAITING',
  READY: 'READY',
  CHARGED: 'CHARGED',
  FLIGHT: 'FLIGHT',
  HALTED: 'HALTED',
 };

const GAME_STATES = {
  LOADING: 'LOADING',
  MENU: 'MENU',
  PLAYING: 'PLAYING',
  LEVEL_SELECTION: 'LEVEL_SELECTION',
  RESULTS: 'RESULTS',
};


// DOM ids and classes

const CLASS_BUILD_BTN = '.build-btn';
const CLASS_HIDDEN = 'hidden';
const CLASS_LEVELS_LISTING = '.levels-listing';
const CLASS_LEVELS = 'levels';
const CLASS_LEVEL = 'level';
const CLASS_LEVEL_NUMBER = 'level-number';
const CLASS_LEVEL_STARS = 'level-stars';
const CLASS_LEVELS_SCREEN = '.level-selector-screen';
const CLASS_LEVELS_BACK_BTN = '.levels-back-btn';
const CLASS_RESULTS_MENU_BTN = '.results__menu-btn';
const CLASS_RESULTS_LEVELS_BTN = '.results__levels-btn';
const CLASS_MENU_SCREEN = '.menu-screen';
const CLASS_RESULTS_SCREEN = '.results-screen';
const CLASS_START_BTN = '.start-btn';
const CLASS_PAUSE_BTN = '.pause-btn';
const CLASS_PAUSE_SCREEN = '.pause-screen';
const CLASS_RESUME_BTN = '.pause-card__resume-btn';
const CLASS_RESTART_BTN = '.pause-card__restart-btn';
const CLASS_EXIT_BTN = '.pause-card__exit-btn';
const CLASS_PLAY_BTN = '.play-btn';
const ID_CONTAINER = '#main-container';


// ** relative consts **

const GROUND_Y = DEFAULT_WINDOW_HEIGHT - GROUND_HEIGHT;

const SLINGSHOT_Y = GROUND_Y - SLINGSHOT_HEIGHT;
const SLINGSHOT_RELAX_X = SLINGSHOT_X;
const SLINGSHOT_RELAX_Y = SLINGSHOT_Y;

const LOADED_BIRD_X = SLINGSHOT_RELAX_X;
const LOADED_BIRD_Y = SLINGSHOT_RELAX_Y;

