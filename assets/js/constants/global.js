const BIRD_DX = 5;
const BIRD_DY = -15;
const BIRD_MASS = 60;
const BIRD_RADIUS = 25;
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

const DAMPING_X = 0.18;
const DAMPING_Y = 0.4;

const DEFAULT_WINDOW_WIDTH = 1600;
const DEFAULT_WINDOW_HEIGHT = 720;

const DEFAULT_D2X = 0;
const DEFAULT_D2Y = 0.3;

const FPS_COUNTER_FONT = '30px Angry';

const GROUND_HEIGHT = 100;

const GAME_WON_TEXT = 'Level Cleared!';
const GAME_LOST_TEXT = 'Level Failed!';

const HOOKES_CONSTANT = 0.8;

const MIN_JUMP_VELOCITY = 0.9;

const LAUNCH_MASS = 30;
const LEVELS_NUMBER = 5;
const LEVEL_ONE = 1;

const PIG_MASS = 10;
const PIG_RADIUS = 30;

const SCORE_TEXT = {
  position: {
    x: 50,
    y: 80,
  },
  font: '3em angrybirds',
};

const SLINGSHOT_X = 200;
const SLINGSHOT_WIDTH = 60;
const SLINGSHOT_HEIGHT = 110;
const SLINGSHOT_MAX_LENGTH = 100;
const SLINGSHOT_DEFAULT_ANGLE = 0;
const SLINGSHOT_DEFAULT_STRETCH_LENGTH = 0;

const TARGET_FPS = 60;
const TOTAL_STARS_NUMBER = 3;

// relative consts

const GROUND_Y = DEFAULT_WINDOW_HEIGHT - GROUND_HEIGHT;

const SLINGSHOT_Y = GROUND_Y - SLINGSHOT_HEIGHT;
const SLINGSHOT_RELAX_X = SLINGSHOT_X;
const SLINGSHOT_RELAX_Y = SLINGSHOT_Y;

const LOADED_BIRD_X = SLINGSHOT_RELAX_X;
const LOADED_BIRD_Y = SLINGSHOT_RELAX_Y;

