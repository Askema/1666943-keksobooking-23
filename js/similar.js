const templatePopup = document.querySelector('#card').content.querySelector('.popup');

const typeOfApartment = {
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  palace: 'Дворец',
  hotel: 'Отель',
};

const makePopup = (data) => {
  const popupElement = templatePopup.cloneNode(true);
  popupElement.querySelector('.popup__avatar').src = data.author.avatar;
  popupElement.querySelector('.popup__title').textContent = data.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = data.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = data.offer.price;
  popupElement.querySelector('.popup__type').textContent = typeOfApartment[data.offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  popupElement.querySelector('.popup__features').textContent = '';
  popupElement.querySelector('.popup__description').textContent = data.offer.description;
  popupElement.querySelector('.popup__photo').parentNode.removeChild(popupElement.querySelector('.popup__photo'));

  if (!data.offer.title) {
    popupElement.removeChild(popupElement.querySelector('.popup__title'));
  }

  if (!data.offer.address) {
    popupElement.removeChild(popupElement.querySelector('.popup__text--address'));
  }

  if (!data.offer.price) {
    popupElement.removeChild(popupElement.querySelector('.popup__text--price'));
  }

  if (!data.offer.type) {
    popupElement.removeChild(popupElement.querySelector('.popup__type'));
  }

  if (!data.offer.rooms || !data.offer.guests) {
    popupElement.removeChild(popupElement.querySelector('.popup__text--capacity'));
  }

  if (!data.offer.checkin || !data.offer.checkout) {
    popupElement.removeChild(popupElement.querySelector('.popup__text--time'));
  }

  if (!data.offer.features) {
    popupElement.removeChild(popupElement.querySelector('.popup__features'));
  } else {
    for (let featureIndex = 0; featureIndex <= data.offer.features.length - 1; featureIndex++) {
      popupElement.querySelector('.popup__features').insertAdjacentHTML('afterbegin', `<li class="popup__feature popup__feature--${data.offer.features[featureIndex]}"></li>`);
    }
  }

  if (!data.offer.description) {
    popupElement.removeChild(popupElement.querySelector('.popup__description'));
  }

  if (!data.offer.photos) {
    popupElement.removeChild(popupElement.querySelector('.popup__photos'));
  } else {
    for (let sourcePhoto = 0; sourcePhoto <= data.offer.photos.length - 1; sourcePhoto++) {
      popupElement.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', `<img src="${data.offer.photos[sourcePhoto]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    }
  }

  return popupElement;
};

export { makePopup };
