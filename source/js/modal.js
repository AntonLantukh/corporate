'use strict';
import loader from "./loader";

const buttonContact = document.querySelector('.footer-bottom__mail');
const body = document.querySelector('body');
const ESC_KEYCODE = 27;

const modalTemplate = () => {
  return `<div class="modal">
    <buttton class="modal__close">Закрыть</buttton>
    <form class="modal__wrapper" method="post" enctype="multipart/form-data">
      <div class="modal-popup__group">
        <label class="modal-popup__label" for="name">Тема</label>
        <input class="modal-popup__input modal-popup__input--theme" type="text" id="theme" name="theme" placeholder="Укажите тему" required>
      </div>
      <div class="modal-popup__group">
        <label class="modal-popup__label modal-popup__label--wide" for="text-message">Текст:</label>
        <textarea class="modal-popup__input modal-popup__input--wide" id="text-message" name="text-message" placeholder="В свободной форме" required></textarea>
      </div>
      <button class="modal__submit oval-button" type="submit">Отправить</button>
    </form>
  </div>`;
}

const modalOverlayTemplate = () => {
  return `<div class="modal-overlay"></div>`;
}

// Function to create a node from html template
const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;
  // Getting rid of div container
  const resultingElement = container.children[0];

  return resultingElement;
};

// Function to delete popup at cross sign
const onPopEscPress = (evt) => {
  const modal = document.querySelector('.modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modal && evt.keyCode === ESC_KEYCODE) {
    modal.remove();
    modalOverlay.remove();
    document.removeEventListener('keydown', onPopEscPress);
  }
}

// If clicking contact button
buttonContact.addEventListener('click', function() {
  // Constructing nodes
  const modal = getElementFromTemplate(modalTemplate());
  const modalOverlay = getElementFromTemplate(modalOverlayTemplate());
  // Appending to DOM
  body.insertAdjacentElement('beforeEnd', modal);
  body.insertAdjacentElement('beforeEnd', modalOverlay);
  // Setting variables
  const closeButton = modal.querySelector('.modal__close')
  const submitButton = modal.querySelector('.modal__submit')
  const modalInputTheme = modal.querySelector('.modal-popup__input--theme');
  // Closing the modal at ESC
  document.addEventListener('keydown', onPopEscPress);
  // Closing the modal at cross sign
  closeButton.addEventListener('click', function() {
    modal.remove();
    modalOverlay.remove();
  })
  // Closing the modal at submit
  submitButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    alert(modalInputTheme.value);
    modal.remove();
    modalOverlay.remove();
    loader();
  })
})
