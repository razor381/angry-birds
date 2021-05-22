const BIRD_DX = 5;
const BIRD_DY = -15;
const BIRD_MASS = 60;
const BIRD_RADIUS = 25;
const BIRDS_QTY = 2;

const BASE_MASS = 40;
const BASE_ANGLE = 0;

const BLOCK_MASS = 20;
const BLOCK_WIDTH = 20;
const BLOCK_HEIGHT = 20;

const CLASS_CANVAS = 'canvas';
const CLASS_BIRD = 'bird';

const DAMPING_X = 0.18;
const DAMPING_Y = 0.4;

const DEFAULT_WINDOW_WIDTH = 1280;
const DEFAULT_WINDOW_HEIGHT = 720;

const DEFAULT_D2X = 0;
const DEFAULT_D2Y = 0.3;

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

const PIG_MASS = 10;
const PIG_RADIUS = 20;
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

const SLINGSHOT_X = 80;
const SLINGSHOT_WIDTH = 60;
const SLINGSHOT_HEIGHT = 110;
const SLINGSHOT_MAX_LENGTH = 100;
const SLINGSHOT_DEFAULT_ANGLE = 0;
const SLINGSHOT_DEFAULT_STRETCH_LENGTH = 0;

const TARGET_FPS = 60;

const TAG_BODY = 'body';
const TAG_CANVAS = 'canvas';

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

const ID_CONTAINER = '#main-container';
const CLASS_MENU_SCREEN = '.menu-screen';
const CLASS_HIDDEN = 'hidden';
const START_BTN = '.start-btn';
const BUILD_BTN = '.build-btn';


// ** relative consts **

const GROUND_Y = DEFAULT_WINDOW_HEIGHT - GROUND_HEIGHT;

const SLINGSHOT_Y = GROUND_Y - SLINGSHOT_HEIGHT;
const SLINGSHOT_RELAX_X = SLINGSHOT_X;
const SLINGSHOT_RELAX_Y = SLINGSHOT_Y;

const BIRD_X = SLINGSHOT_RELAX_X;
const BIRD_Y = SLINGSHOT_RELAX_Y;

