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

const BUILDER_ENTITIES_SCHEMA = {
  ENEMY: [],
  OBSTACLE: [],
};

const BUILDER_SEEDER_SCHEMA = {
  birds: [],
  pigs: [],
  blocks: [],
};
