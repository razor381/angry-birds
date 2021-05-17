function createNewElement(tag, classes) {
  const newEl = document.createElement(tag);
  newEl.classList.add(...classes);
  return newEl;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getEl(name, all=false) {
  return all?  document.querySelectorAll(name) : document.querySelector(name);
}

function addInsideParentEl(el, parentEl) {
  parentEl.appendChild(el);
}

function createImage(src, classes = []) {
  let img = new Image();
  img.src = src;
  img.classList.add(...classes);
  return img;
}

function getMousePos(canvas, evt, entitySize) {
  const { left, top } = canvas.getBoundingClientRect();

  return {
    x: evt.clientX - left - entitySize.width / 2,
    y: evt.clientY - top - entitySize.height / 2,
  };
}

function getDistanceBetween(p1, p2) {
  const xDiff = p2.x - p1.x;
  const yDiff = p2.y - p1.y;

  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}
