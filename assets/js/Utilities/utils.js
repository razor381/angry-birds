class Utils {
  static loadSound(src, shouldLoop = false) {
    return new Promise(resolve => {
      let audio = new Audio(src);
      audio.loop = shouldLoop;
      audio.volume = VOLUME;
      audio.addEventListener('canplaythrough', () => resolve(audio), false);
    });
  }

  static getUniqueId() {
    return 'id' + Math.random().toString(16).slice(2);
  }

  static flattenObjectToArray(obj) {
    let resultArr = [];

    Object.values(obj).forEach((value) => {
      const flat = Array.isArray(value) ? value : [value];
      resultArr = [...resultArr, ...flat];
    });

    return resultArr;
  }

  static deleteFromArray(list, itemsToDelete) {
    let newList = list;

    itemsToDelete.forEach((itemToDelete) => {
      newList = newList.filter((item) => item.id !== itemToDelete.id);
    });

    return newList;
  }

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

  static loadDomImage(src, ...classes) {
    return new Promise((resolve) => {
      const image = Utils.createNewElement(TAG_IMG, classes);
      image.onload = () => resolve(image);
      image.src = src;
    });
  }

  static loadImage(src, classes = []) {
    return new Promise((resolve) => {
      const image = new Image();

      image.onload = () => resolve(image);
      image.src = src;
      image.classList.add(...classes);
    });
  }

  static toRadians(deg) {
    return deg * (Math.PI / 180);
  }

  static toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  static getSubtypeImage(subtype) {
    return Picture.getPicture(SUBTYPE_IMAGE_MAPPER[subtype]);
  }

  static getMousePos(canvas, evt) {
    const { left, top } = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - left,
      y: evt.clientY - top,
    };
  }

  static drawLine(ctx, startPoint, endPoint, thickness, color) {
    ctx.save();
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  static async loadJson(path) {
    const res = await fetch(path);
    const json = await res.json();
    return json.data;
  }

  static getFromLocal(key) {
    return localStorage.getItem(key);
  }

  static saveToLocal(key, data) {
    localStorage.setItem(key, data);
  }

  static throwErr(message, error) {
    throw { message, error };
  }
}

