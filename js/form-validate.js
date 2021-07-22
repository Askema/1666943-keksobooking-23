const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
let minPriceValue = 1000;

const ZERO = '0';
const ONE = '1';
const TWO = '2';
const THREE = '3';
const HUNDRED = '100';


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
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

selectType.addEventListener('change', () => {
  minPriceValue = TYPES[selectType.value].minPrice;
  inputPrice.placeholder = minPriceValue;
  inputPrice.min = minPriceValue;
});

inputTitle.addEventListener('input', () => {
  const valueLength = inputTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Минимум ${MIN_TITLE_LENGTH} символов. Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Максимум ${MAX_TITLE_LENGTH} символов. Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
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

const onCapacityChange = () => {
  if (selectRooms.value === ONE && selectGuests.value !== ONE) {
    selectRooms.setCustomValidity(`Доступно только ${selectGuests[2].textContent}`);
  } else if (selectRooms.value === TWO && selectGuests.value !== TWO && selectGuests.value !== ONE) {
    selectRooms.setCustomValidity(`Доступно только ${selectGuests[2].textContent} и ${selectGuests[1].textContent}`);
  } else if (selectRooms.value === HUNDRED && selectGuests.value !== ZERO) {
    selectRooms.setCustomValidity('100 комнат доступны только без гостей');
  } else if (selectRooms.value === THREE && selectGuests.value === ZERO) {
    selectRooms.setCustomValidity('3 комнаты не доступны без гостей');
  } else {
    selectRooms.setCustomValidity('');
  }
  selectRooms.reportValidity();
};

selectRooms.addEventListener('change', onCapacityChange);
selectGuests.addEventListener('change', onCapacityChange);

const onTimeInChange = () => {
  const index = timeIn.selectedIndex;
  timeOut.selectedIndex = index;
};

const onTmeOutChange = () => {
  const index = timeOut.selectedIndex;
  timeIn.selectedIndex = index;
};

timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTmeOutChange);

