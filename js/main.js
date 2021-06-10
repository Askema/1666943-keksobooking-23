// функцию взял из https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Дополнил методом toFixed

function getRandomIntFromRange(min, max, roundPlus) {
  if (arguments.length === 3) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.random() * (max - min + 1)  + min).toFixed(roundPlus);
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

getRandomIntFromRange();

