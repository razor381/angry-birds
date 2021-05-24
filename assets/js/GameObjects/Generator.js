class Generator {
  constructor() {
    this.generationObject = undefined;

    this.init();
  }

  init() {
    this.loadJson();
  }

  async loadJson() {
    const res = await fetch('/assets/js/Utilities/seeder.json');
    const json = await res.json();
    this.generationObject = json.data;
  }

  generateBirds({ birds }) {
    const createdBirds = birds.map(({ type }, index) => {

      const birdPosition = new Point(
        BIRD_QUEUE_START.x,
        BIRD_QUEUE_START.y - (index+1) * BIRD_QUEUE_GAP,
      );

      return new Bird(birdPosition, type);
    });

    return createdBirds;
  }

  generatePigs({ pigs }) {
    return pigs.map(({ position, type }) => new Pig(position, type));
  }

  generateBlocks({ blocks }) {
    return blocks.map(({ position, type }) => new Obstacle(position, type));
  }

  generateGameEntities() {
    return {
      birds: this.generateBirds(this.generationObject),
      pigs: this.generatePigs(this.generationObject),
      blocks: this.generateBlocks(this.generationObject),
    };
  }
}
