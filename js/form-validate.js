const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
let minPriceValue = 1000;

const TYPES = {
  'palace': { minPrice: 10000 },
  'flat': { minPrice: 1000 },
  'house': { minPrice: 5000 },
  'bungalow': { minPrice: 0 },
  'hotel': { minPrice: 3000 },
};

const inputPrice = document.querySelector('#price');

const inputTitle = document.querySelector('#title');

const selectType = document.querySelector('#type');

const selectRooms = document.querySelector('#room_number');

const selectGuests = document.querySelector('#capacity');

selectType.addEventListener('change', () => {
  minPriceValue = TYPES[selectType.value].minPrice;
  inputPrice.placeholder = minPriceValue;
  inputPrice.setAttribute('min', inputPrice.value);
});

inputTitle.addEventListener('input', () => {
  const valueLength = inputTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Минимум 30 символов. Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Максимум 100 символов. Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    inputTitle.setCustomValidity('');
  }
  inputTitle.reportValidity();
});

inputPrice.addEventListener('input', () => {
  if (inputPrice.value > MAX_PRICE_VALUE) {
    inputPrice.setCustomValidity(`Максимальное значение: ${MAX_PRICE_VALUE}`);
  } else if (inputPrice.value < minPriceValue) {
    inputPrice.setCustomValidity(`Минимальное значение для выбранного типа ${minPriceValue}`);
  } else {
    inputPrice.setCustomValidity('');
  }
  inputPrice.reportValidity();
});

/*
function disable(Array) {
  for (let option = 0; option <= Array.length - 1; option++) {
    Array[option].setAttribute('disabled', 'disabled');
  }
}
*/

const checkRoomsAndGuests = function() {
  if (selectRooms.value === '1' && selectGuests.value !== '1') {
    selectRooms.setCustomValidity(`Доступно только ${selectGuests[2].textContent}`);
  } else if (selectRooms.value === '2' && selectGuests.value !== '2' && selectGuests.value !== '1') {
    selectRooms.setCustomValidity(`Доступно только ${selectGuests[2].textContent}, ${selectGuests[1].textContent} и ${selectGuests[0].textContent}`);
  } else if (selectRooms.value === '100' && selectGuests.value !== '0' ) {
    selectRooms.setCustomValidity('100 комнат доступны только без гостей');
  } else if (selectRooms.value === '3' && selectGuests.value === '0' ) {
    selectRooms.setCustomValidity('3 комнаты не доступны без гостей');
  } else {
    inputPrice.setCustomValidity('');
  }
  inputPrice.reportValidity();
};

selectRooms.addEventListener('change', checkRoomsAndGuests);
selectGuests.addEventListener('change', checkRoomsAndGuests);
