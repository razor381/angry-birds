class Pig extends RoundObject {
  constructor(position) {
    super(
      position,
      PIG_MASS,
      PIG_RADIUS,
      PIG_STATE.RESTING,
      Utils.createImage(IMAGE_PIG),
    );
  }

  static generatePigs() {
    const pigs = [];

    const startPos = new Point(500, 200);

    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 3; j++) {
        pigs.push(
          new Pig(
            Point.add(startPos, new Point(i * 45, j * 65)),
          )
        );
      }
    }

    return pigs;
  }
}
