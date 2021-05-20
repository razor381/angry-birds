class Canvas {
  constructor(width = DEFAULT_WINDOW_WIDTH, height = DEFAULT_WINDOW_HEIGHT) {
    this.width = width;
    this.height = height;
    this.el = null;
    this.ctx = null;

    this.createCanvas(width, height)
  }

  createCanvas(width, height) {
    const bodyEl = Utils.getEl(TAG_BODY);

    this.el = Utils.createNewElement(TAG_CANVAS, [CLASS_CANVAS]);
    this.el.width = width || DEFAULT_WINDOW_WIDTH;
    this.el.height = height || DEFAULT_WINDOW_HEIGHT;

    this.ctx = this.el.getContext('2d');

    Utils.addInsideParentEl(this.el, bodyEl);
  }
}
