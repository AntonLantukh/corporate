'use strict';

const thumbsContainer = document.querySelector('.slider-pictures__wrapper');
const mainImg = document.querySelector('.slider-pictures__main-image');
const buttonLeft = document.querySelector('.slider-pictures__button--left');
const buttonRight = document.querySelector('.slider-pictures__button--right');
let marginValue;

// Image click
thumbsContainer.addEventListener('click', function(evt) {
  const chosenImgDiv = document.querySelector('.slider-pictures__slide--active');
  if (evt.target.tagName === 'IMG') {

    unwrap(chosenImgDiv);
    wrap(evt.target);

    mainImg.setAttribute('src', evt.target.src);
  }
});

// Button click
buttonLeft.addEventListener('click', function() {
  const chosenImgDiv = document.querySelector('.slider-pictures__slide--active');
  if (chosenImgDiv.previousSibling) {
    marginValue += -161.25;
    thumbsContainer.setAtribute('style', 'margin-left:' + marginValue + 'px');
  }
})

buttonRight.addEventListener('click', function() {
  const chosenImgDiv = document.querySelector('.slider-pictures__slide--active');
  if (chosenImgDiv.nextSibling) {

  }
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
