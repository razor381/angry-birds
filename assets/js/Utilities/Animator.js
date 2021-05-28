class Animator {
  constructor(entity, subtype) {
    this.entity = entity;
    this.subtype = subtype;

    this.init();
  }

  static collisionPoints = [];
  static smokePoints = [];

  init() {
    const spriteData = SUBTYPE_SPRITE_MAPPER[this.subtype];

    Animator.collisionImage = Picture.getPicture(IMAGE_COLLISION);
    Animator.smokeImage = Picture.getPicture(IMAGE_SMOKE);

    this.image = Picture.getPicture(spriteData.sprite);
    this.frameBox = spriteData.frameBox;
    this.framePos = spriteData.framePos;
    this.stateMapper = spriteData.stateMapper;
    this.frameCounter = 0;
    this.animationEventTimer = 20;
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

  static showCollisionAt(point) {
    Animator.collisionPoints.push(point);
  }

  static showCollisionAnimations(ctx) {
    Animator.collisionPoints.forEach((point) => {
      Animator.showCollision(ctx, point);
    });
  }

  static showSmokeAt(point) {
    Animator.smokePoints.push(point);
  }

  static showSmokeAnimations(ctx) {
    Animator.smokePoints.forEach((point) => {
      Animator.showSmoke(ctx, point);
    });
  }

  static showCollision(ctx, position) {
    ctx.drawImage(
      Animator.collisionImage,
      position.x,
      position.y,
      COLLISION_IMAGE_WIDTH,
      COLLISION_IMAGE_WIDTH
    );

    setTimeout(() => {
      Animator.collisionPoints =[];
    }, COLLISION_ANIMATION_DURATION);
  }

  static showSmoke(ctx, position) {
    ctx.drawImage(
      Animator.smokeImage,
      position.x,
      position.y,
      SMOKE_IMAGE_WIDTH,
      SMOKE_IMAGE_WIDTH
    );

    setTimeout(() => {
      Animator.smokePoints =[];
    }, SMOKE_ANIMATION_DURATION);
  }
}
