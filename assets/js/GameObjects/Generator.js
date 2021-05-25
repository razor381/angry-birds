class Generator {
  constructor() {
    this.init();
  }

  init() {
    this.generationObject = undefined;
  }

  async loadJson(level) {
    const res = await fetch(LEVEL_SEED_MAPPER[level]);
    const json = await res.json();
    this.generationObject = json.data;
  }

  generateBirds({ birds }) {
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

  generatePigs({ pigs }) {
    return pigs.map(({ position, subtype }) => new Pig(position, subtype));
  }

  generateBlocks({ blocks }) {
    return blocks.map(({ position, subtype }) => new Obstacle(position, subtype));
  }

  async generateGameEntities(level) {
    await this.loadJson(level);

    return {
      birds: this.generateBirds(this.generationObject),
      pigs: this.generatePigs(this.generationObject),
      blocks: this.generateBlocks(this.generationObject),
    };
  }
}
