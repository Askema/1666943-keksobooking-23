const ESC = 'Esc';
const ESCAPE = 'Escape';

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

const Esc = (evt) => evt.key === ESC || evt.key === ESCAPE;

export { getRandomIntFromRange, roundOff, Esc};

