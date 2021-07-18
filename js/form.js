const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');

const inactiveForm = () => {
  adForm.classList.add('ad-form--disabled');

  for (let formElementIndex = 0; formElementIndex <= adFormElements.length - 1; formElementIndex++) {
    adFormElements[formElementIndex].setAttribute('disabled', 'disabled');
  }
};

const activeForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let formElementIndex = 0; formElementIndex <= adFormElements.length - 1; formElementIndex++) {
    adFormElements[formElementIndex].removeAttribute('disabled');
  }
};

inactiveForm();

const activeMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');

  for (let mapFiltersIndex = 0; mapFiltersIndex <= mapFilters.children.length - 1; mapFiltersIndex++) {
    mapFilters.children[mapFiltersIndex].removeAttribute('disabled');
  }
};

export { inactiveForm, activeForm, activeMapFilters};
