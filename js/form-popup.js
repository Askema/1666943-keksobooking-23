import { sendData } from './data.js';
import { esc } from './util.js';
import { restoreData } from './map.js';

const adForm = document.querySelector('.ad-form');
const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = error.querySelector('.error__button');
const successMessage = success.cloneNode(true);
const errorMessage = error.cloneNode(true);

const closePopup = () => {
  if (document.body.contains(successMessage)) {
    document.body.removeChild(successMessage);
  } else {
    document.body.removeChild(errorMessage);
  }
};

const popupEscKeydown = (evt) => {
  if (esc(evt)) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', popupEscKeydown);
  }
};

const onPopupClick = (evt) => {
  evt.preventDefault();
  closePopup();
};

const showPopupSuccess = () => {
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', popupEscKeydown);
  successMessage.addEventListener('click', onPopupClick);
  restoreData();
};

const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
  document.addEventListener('keydown', popupEscKeydown);
  errorMessage.addEventListener('click', onPopupClick);
  errorButton.addEventListener('click', closePopup);
};

const formSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => showPopupSuccess(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

formSubmit();
