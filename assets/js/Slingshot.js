class Slingshot extends StaticObject {
  constructor() {
    super(
      new Vector(SLINGSHOT_X, SLINGSHOT_Y),
      SLINGSHOT_WIDTH,
      SLINGSHOT_HEIGHT,
      createImage(IMAGE_SLINGSHOT),
    );

    this.relaxPos = new Vector(SLINGSHOT_RELAX_X, SLINGSHOT_RELAX_Y);
    this.stretchAngle = 0;
    this.stretchLength = 0;
    this.maxStretchLength = SLINGSHOT_MAX_LENGTH;
  }
}
