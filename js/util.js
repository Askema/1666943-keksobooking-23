const ESC = 'Esc';
const ESCAPE = 'Escape';
const DEFAULT_FILTER = 'any';

const priceCategories = {
  middle: 'middle',
  low: 'low',
  high: 'high',
};

const pricesRange = {
  low: 10000,
  high: 50000,
};

const roundOff = (number) => Number(number.toFixed(5));

const getEsc = (evt) => evt.key === ESC || evt.key === ESCAPE;

const debounce = (callback, timeoutDelay = 500) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const matchFilter = (findings, filterValue) => String(findings) === String(filterValue) || filterValue === DEFAULT_FILTER;

const matchPrice = (findings, filterValue) => {
  if (filterValue === priceCategories.low) {
    return findings < pricesRange.low;
  }
  if (filterValue === priceCategories.middle) {
    return findings >= pricesRange.low && findings < pricesRange.high;
  }
  if (filterValue === priceCategories.high) {
    return findings >= pricesRange.high;
  }
  return true;
};

const matchFeatures = (findings) => {
  const checkedFeatures = document.querySelector('.map__filters').querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every((feature) => {
    if (findings) {
      return findings.includes(feature.value);
    }
  });
};
export { roundOff, getEsc, debounce, matchFilter, matchPrice, matchFeatures};

