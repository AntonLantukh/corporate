'use strict';

const thumbsContainer = document.querySelector('.slider-pictures__wrapper');
const mainImg = document.querySelector('.slider-pictures__main-image');
const textImg = document.querySelector('.slider-pictures__text');
const countImg = document.querySelector('.slider-pictures__count');

const buttonLeft = document.querySelector('.slider-pictures__button--left');
const buttonRight = document.querySelector('.slider-pictures__button--right');
const nodes = document.querySelectorAll('.slider-pictures__slide');
const displayedElements = 7;
const widthSize = 161.25;
let marginValue = 0;

// Image click
thumbsContainer.addEventListener('click', function(evt) {
  const chosenImgDiv = document.querySelector('.slider-pictures__slide--active');
  if (evt.target.tagName === 'IMG') {

    unwrap(chosenImgDiv);
    wrap(evt.target);
    let nodeNumber = defineNumber();

    mainImg.setAttribute('src', evt.target.src);
    textImg.textContent = evt.target.dataset.text;
    countImg.textContent = nodeNumber + ' / ' + nodes.length;
  }
});

// Button click
buttonLeft.addEventListener('click', function() {
  marginValue = Math.min(marginValue + widthSize, widthSize);
  thumbsContainer.setAttribute('style', 'margin-left:' + marginValue + 'px');
})

buttonRight.addEventListener('click', function() {
  marginValue = Math.max(marginValue - widthSize, -widthSize * (nodes.length - displayedElements));
  thumbsContainer.setAttribute('style', 'margin-left:' + marginValue + 'px');
})


const unwrap = (node) => {
  node.classList.remove('slider-pictures__slide--active');
  thumbsContainer.insertBefore(node.children[0], node);
  node.remove();
}

const wrap = (node) => {
  const div = document.createElement('div');
  div.classList.add('slider-pictures__slide--active');
  thumbsContainer.insertBefore(div, node);
  div.appendChild(node);
}

const defineNumber = () => {
  debugger;
  let count = 1;
  for (let i = 1; i < thumbsContainer.childElementCount; i++) {
    count++;
    if (thumbsContainer.children[i].children[0]) {
      break;
    };
  }
  return count;
}
