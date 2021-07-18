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

function getRandomIntFromRange(value1, value2, roundPlus) {
  let min = Math.min(value1, value2);
  let max = Math.max(value1, value2);
  if (arguments.length === 3) {
    return Number((Math.random() * (max - min) + min).toFixed(roundPlus));
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const roundOff = (number) => Number(number.toFixed(5));

const esc = (evt) => evt.key === ESC || evt.key === ESCAPE;

function debounce (callback, timeoutDelay = 500) {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

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
  const checkedFeatures = document.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every((feature) => {
    if (findings) {
      return findings.includes(feature.value);
    }
  });
};
export { getRandomIntFromRange, roundOff, esc, debounce, matchFilter, matchPrice, matchFeatures};

