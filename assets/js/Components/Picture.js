class Picture {
  static async loadPictures(loader) {
    Picture.pictures = {
      IMAGE_BACKGROUND: await Utils.loadImage(IMAGE_BACKGROUND_PATH),
      IMAGE_ICE_BLOCK: await Utils.loadImage(IMAGE_ICE_BLOCK_PATH),
      IMAGE_WOOD_BLOCK: await Utils.loadImage(IMAGE_WOOD_BLOCK_PATH),
      IMAGE_STONE_BLOCK: await Utils.loadImage(IMAGE_STONE_BLOCK_PATH),
      IMAGE_RED: await Utils.loadImage(IMAGE_RED_PATH),
      IMAGE_CHUCK: await Utils.loadImage(IMAGE_CHUCK_PATH),
      IMAGE_PIG: await Utils.loadImage(IMAGE_PIG_PATH),
      IMAGE_PIG_ARMORED: await Utils.loadImage(IMAGE_PIG_ARMORED_PATH),
      IMAGE_COLLISION: await Utils.loadImage(IMAGE_COLLISION_PATH),
      IMAGE_SMOKE: await Utils.loadImage(IMAGE_SMOKE_PATH),
      IMAGE_POCKET: await Utils.loadImage(IMAGE_POCKET_PATH),
      IMAGE_RESULTS_WON: await Utils.loadImage(IMAGE_RESULTS_WON_PATH),
      IMAGE_RESULTS_LOST: await Utils.loadImage(IMAGE_RESULTS_LOST_PATH, [CLASS_RESULTS_RANK_IMG]),
      IMAGE_SLINGSHOT: await Utils.loadImage(IMAGE_SLINGSHOT_PATH),
      IMAGE_STAR: await Utils.loadDomImage(IMAGE_STAR_PATH, [CLASS_RESULTS_STAR]),
      IMAGE_STAR_OFF: await Utils.loadDomImage(IMAGE_STAR_OFF_PATH, [CLASS_RESULTS_STAR]),
      IMAGE_SMALL_STAR: await Utils.loadDomImage(IMAGE_STAR_PATH, [CLASS_LEVELS_STAR]),
      IMAGE_SMALL_STAR_OFF: await Utils.loadDomImage(IMAGE_STAR_OFF_PATH, [CLASS_LEVELS_STAR]),
      SPRITE_ICE_BLOCK: await Utils.loadImage(SPRITE_ICE_BLOCK_PATH),
      SPRITE_WOOD_BLOCK: await Utils.loadImage(SPRITE_WOOD_BLOCK_PATH),
      SPRITE_STONE_BLOCK: await Utils.loadImage(SPRITE_STONE_BLOCK_PATH),
      SPRITE_RED: await Utils.loadImage(SPRITE_RED_PATH),
      SPRITE_CHUCK: await Utils.loadImage(SPRITE_CHUCK_PATH),
      SPRITE_UNARMORED_PIG: await Utils.loadImage(SPRITE_UNARMORED_PIG_PATH),
      SPRITE_PIG_ARMORED: await Utils.loadImage(SPRITE_PIG_ARMORED_PATH),
    };

    Picture.checkPicturesLoaded(loader);
  }

  static async checkPicturesLoaded(loader) {
    await Promise.all(Object.values(Picture.pictures));
    loader.hasPicturesLoaded = true;
  }

  static getPicture(img, shouldClone = false) {
    const pic = Picture.pictures[img];

    return shouldClone ? pic.cloneNode(false) : pic;
  }
}
