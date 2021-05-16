class Canvas {
  constructor(width = DEFAULT_WINDOW_WIDTH, height = DEFAULT_WINDOW_HEIGHT) {
    this.width = width;
    this.height = height;
    this.canvas = null;
    this.ctx = null;

    this.createCanvas(width, height)
  }

  createCanvas(width, height) {
    const bodyEl = getEl(TAG_BODY);

    this.canvas = createNewElement('canvas', [CLASS_CANVAS]);
    this.canvas.width = width || DEFAULT_WINDOW_WIDTH;
    this.canvas.height = height || DEFAULT_WINDOW_HEIGHT;

    this.ctx = this.canvas.getContext('2d');

    addInsideParentEl(this.canvas, bodyEl);
  }
}
