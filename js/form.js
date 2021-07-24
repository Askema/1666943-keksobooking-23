const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const PHOTO_ELEMENT_HTML = '<img class="ad-form__img" src="img/muffin-grey.svg" alt="Фотография жилья" width="40" height="44">';
const DEFAULT_IMAGE = 'img/muffin-grey.svg';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.children;
const avatarFileChooser = adForm.querySelector('#avatar');
const previewAvatar = adForm.querySelector('.ad-form-header__preview img');
const photoFileChooser = adForm.querySelector('#images');
const previewPhotoContainer = adForm.querySelector('.ad-form__photo');
previewPhotoContainer.insertAdjacentHTML('beforeend', PHOTO_ELEMENT_HTML);
const previewPhoto = previewPhotoContainer.querySelector('img');

const makeFormInactive = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const makeFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

makeFormInactive();

const makeMapFiltersActive = () => {
  mapFilters.classList.remove('map__filters--disabled');
  [].forEach.call(mapFilter, (el) => {
    el.removeAttribute('disabled');
  });
};

const addImage = (chooser, preview) => {
  chooser.addEventListener('change', () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

addImage(avatarFileChooser, previewAvatar);
addImage(photoFileChooser, previewPhoto);

const resetPreview = () => {
  previewAvatar.src = DEFAULT_IMAGE;
  previewPhoto.src = DEFAULT_IMAGE;
};

export { makeFormInactive, makeFormActive, makeMapFiltersActive, resetPreview};
