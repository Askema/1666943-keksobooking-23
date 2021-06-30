import {createFlatsNearby} from './data.js';

const similarFlats = createFlatsNearby();
const templatePopup = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const fragment = document.createDocumentFragment();

similarFlats.forEach(({author, offer}) => {
  const popupElement = templatePopup.cloneNode(true);
  popupElement.querySelector('.popup__avatar').src = author.avatar;
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__text--price').textContent = offer.price;
  popupElement.querySelector('.popup__type').textContent = offer.type;
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupElement.querySelector('.popup__features').textContent = offer.features;
  popupElement.querySelector('.popup__description').textContent = offer.description;
  popupElement.querySelector('.popup__photo').parentNode.removeChild(popupElement.querySelector('.popup__photo'));

  for (let sourcePhoto = 0; sourcePhoto <= offer.photos.length - 1; sourcePhoto++) {
    popupElement.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', `<img src="${offer.photos[sourcePhoto]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  }

  if (!offer.title) {
    popupElement.removeChild(popupElement.querySelector('.popup__title'));
  }

  if (!offer.address) {
    popupElement.removeChild(popupElement.querySelector('.popup__text--address'));
  }

  if (!offer.price) {
    popupElement.removeChild(popupElement.querySelector('.popup__text--price'));
  }

  if (!offer.type) {
    popupElement.removeChild(popupElement.querySelector('.popup__type'));
  }

  if (!offer.rooms || !offer.guests) {
    popupElement.removeChild(popupElement.querySelector('.popup__text--capacity'));
  }

  if (!offer.checkin || !offer.checkout) {
    popupElement.removeChild(popupElement.querySelector('.popup__text--time'));
  }

  if (!offer.features.length === 0) {
    popupElement.removeChild(popupElement.querySelector('.popup__features'));
  }

  if (!offer.description) {
    popupElement.removeChild(popupElement.querySelector('.popup__description'));
  }

  if (!offer.photos.length === 0) {
    popupElement.removeChild(popupElement.querySelector('.popup__photos'));
  }
  fragment.appendChild(popupElement);
});

mapCanvas.appendChild(fragment);
