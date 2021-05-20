class Utils {
  static copyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  static createNewElement(tag, classes) {
    const newEl = document.createElement(tag);
    newEl.classList.add(...classes);
    return newEl;
  }

  static getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static getEl(name, all=false) {
    return all?  document.querySelectorAll(name) : document.querySelector(name);
  }

  static addInsideParentEl(el, parentEl) {
    parentEl.appendChild(el);
  }

  static createImage(src, classes = []) {
    let img = new Image();
    img.src = src;
    img.classList.add(...classes);
    return img;
  }

  static toRadians(deg) {
    return deg * (Math.PI / 180);
  }

  static getMousePos(canvas, evt) {
    const { left, top } = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - left,
      y: evt.clientY - top,
    };
  }
}

