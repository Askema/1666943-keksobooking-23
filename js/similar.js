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
  const popupAvatar = popupElement.querySelector('.popup__avatar');
  const popupTitle = popupElement.querySelector('.popup__title');
  const popupAddress = popupElement.querySelector('.popup__text--address');
  const popupPrice = popupElement.querySelector('.popup__text--price');
  const popupType = popupElement.querySelector('.popup__type');
  const popupCapacity = popupElement.querySelector('.popup__text--capacity');
  const popupTime = popupElement.querySelector('.popup__text--time');
  const popupFeatures = popupElement.querySelector('.popup__features');
  const popupDescription = popupElement.querySelector('.popup__description');
  const popupPhotos = popupElement.querySelector('.popup__photos');
  const popupPhoto = popupElement.querySelector('.popup__photo');

  popupAvatar.src = data.author.avatar;
  popupTitle.textContent = data.offer.title;
  popupAddress.textContent = data.offer.address;
  popupPrice.textContent = data.offer.price;
  popupType.textContent = typeOfApartment[data.offer.type];
  popupCapacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  popupTime.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  popupFeatures.textContent = '';
  popupDescription.textContent = data.offer.description;
  popupPhoto.parentNode.removeChild(popupPhoto);

  if (!data.offer.title) {
    popupElement.removeChild(popupTitle);
  }

  if (!data.offer.address) {
    popupElement.removeChild(popupAddress);
  }

  if (!data.offer.price) {
    popupElement.removeChild(popupPrice);
  }

  if (!data.offer.type) {
    popupElement.removeChild(popupType);
  }

  if (!data.offer.rooms || !data.offer.guests) {
    popupElement.removeChild(popupCapacity);
  }

  if (!data.offer.checkin || !data.offer.checkout) {
    popupElement.removeChild(popupTime);
  }

  if (!data.offer.features) {
    popupElement.removeChild(popupFeatures);
  } else {
    data.offer.features.forEach((features) => {
      popupFeatures.insertAdjacentHTML('afterbegin', `<li class="popup__feature popup__feature--${features}"></li>`);
    });
  }

  if (!data.offer.description) {
    popupElement.removeChild(popupDescription);
  }

  if (!data.offer.photos) {
    popupElement.removeChild(popupPhotos);
  } else {
    data.offer.photos.forEach((photos) => {
      popupPhotos.insertAdjacentHTML('afterbegin', `<img src="${photos}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });
  }

  return popupElement;
};

export { makePopup };
