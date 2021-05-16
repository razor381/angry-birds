class Canvas {
  constructor(width = DEFAULT_WINDOW_WIDTH, height = DEFAULT_WINDOW_HEIGHT) {
    this.width = width;
    this.height = height;
    this.el = null;
    this.ctx = null;

    this.createCanvas(width, height)
  }

  createCanvas(width, height) {
    const bodyEl = getEl(TAG_BODY);

    this.el = createNewElement('canvas', [CLASS_CANVAS]);
    this.el.width = width || DEFAULT_WINDOW_WIDTH;
    this.el.height = height || DEFAULT_WINDOW_HEIGHT;

    this.ctx = this.el.getContext('2d');

    addInsideParentEl(this.el, bodyEl);
  }
}
