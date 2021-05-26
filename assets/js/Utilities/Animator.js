class Animator {
  constructor(entity, subtype) {
    this.entity = entity;
    this.subtype = subtype;

    this.init();
  }

  init() {
    const spriteData = SUBTYPE_SPRITE_MAPPER[this.subtype];

    this.image = Utils.createImage(spriteData.sprite);
    this.frameBox = spriteData.frameBox;
    this.framePos = spriteData.framePos;
    this.stateMapper = spriteData.stateMapper;
    this.frameCounter = 0;
  }

  getFramePosition() {
    const { state, subtype } = this.entity;
    const framePos = TYPE_STATE_FRAME_MAPPER[subtype][state];

    return framePos;
  }

  animate(ctx) {
    const { image, frameBox, entity } = this;
    const framePos = this.getFramePosition();

    const width = entity.isRound ? entity.radius * 2 : (entity.width);
    const height = entity.isRound ? entity.radius * 2 : (entity.height);

    ctx.save();
    ctx.translate(
      entity.position.x + width,
      entity.position.y + height,
    );
    ctx.rotate(Utils.toRadians(entity.angle));
    ctx.beginPath();
    ctx.drawImage(
      image,
      framePos.x,
      framePos.y,
      frameBox.width,
      frameBox.height,
      -width,
      -height,
      width,
      height,
    );
    ctx.closePath();
    ctx.restore();
  }
}
