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

