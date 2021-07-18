import { sendData } from './data.js';
import { getEsc } from './util.js';
import { restoreData } from './map.js';

const adForm = document.querySelector('.ad-form');
const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = error.querySelector('.error__button');
const successMessage = success.cloneNode(true);
const errorMessage = error.cloneNode(true);

const popupCloseHandler = () => {
  if (document.body.contains(successMessage)) {
    document.body.removeChild(successMessage);
  } else {
    document.body.removeChild(errorMessage);
  }
};

const onPopupEscKeydown = (evt) => {
  if (getEsc(evt)) {
    evt.preventDefault();
    popupCloseHandler();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const onPopupClick = (evt) => {
  evt.preventDefault();
  popupCloseHandler();
};

const showPopupSuccess = () => {
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  successMessage.addEventListener('click', onPopupClick);
  restoreData();
};

const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  errorMessage.addEventListener('click', onPopupClick);
  errorButton.addEventListener('click', popupCloseHandler);
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
