class Generator {
  constructor() {
  }

  static generateBirds({ birds }) {
    const createdBirds = birds.map((bird, index) => {

      // give vertical bottom to top queued position to birds
      const birdPosition = new Point(
        BIRD_QUEUE_START.x,
        BIRD_QUEUE_START.y - (index+1) * BIRD_QUEUE_GAP,
      );

      return new Bird(birdPosition, bird.subtype);
    });

    return createdBirds;
  }

  static generatePigs({ pigs }) {
    return pigs.map(({ position, subtype }) => new Pig(position, subtype));
  }

  static generateBlocks({ blocks }) {
    return blocks.map(({ position, subtype }) => new Obstacle(position, subtype));
  }

  static async generateGameEntities(level, levelObject) {

    const generationObject = (level === CUSTOM_GAME_LEVEL && levelObject)
    ? levelObject
    : await Utils.loadJson(LEVEL_SEED_MAPPER[level]);

    return {
      birds: Generator.generateBirds(generationObject),
      pigs: Generator.generatePigs(generationObject),
      blocks: Generator.generateBlocks(generationObject),
    };
  }
}
