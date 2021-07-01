import {getRandomIntFromRange} from './util.js';

const location1 = {};

const AVATARS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const TIME = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

function getAvatar() {
  const avatarIndex = getRandomIntFromRange(AVATARS[0], AVATARS.length - 1);
  const avatar = `img/avatars/user${AVATARS[avatarIndex]}.png`;
  return avatar;
}

function getType() {
  const typeIndex = getRandomIntFromRange(0, TYPES.length - 1);
  const type = TYPES[typeIndex];
  return type;
}

function getPrice() {
  const price = getRandomIntFromRange(0, 50000);
  return price;
}

function getRooms() {
  const rooms = getRandomIntFromRange(0, 100);
  return rooms;
}

function getGuests() {
  const guests = getRandomIntFromRange(0, 4);
  return guests;
}

function getCheckin() {
  const checkinIndex = getRandomIntFromRange(0, TIME.length - 1);
  const checkin = TIME[checkinIndex];
  return checkin;
}

function getCheckout() {
  const checkoutIndex = getRandomIntFromRange(0, TIME.length - 1);
  const checkout = TIME[checkoutIndex];
  return checkout;
}

//Не понимаю, как создать условие, которое бы смогло увидеть значения min и max
/*
function createArray(array) {
  const maxLength = getRandomIntFromRange(0, array.length - 1);
  const minLength = getRandomIntFromRange(0, array.length - 1);
  const min = Math.min(minLength, maxLength);
  const max = Math.max(minLength, maxLength);
  if (min === max && min + max === 0) {
    createArray(array);
  } else {
    return array.slice(min, max);
  }
}
*/

//взял с https://qna.habr.com/q/844269
// Работает, но я не разобрался как

const createArray = ([...source], maxLength) => Array.from(
  { length: Math.min(source.length, 1 + Math.random() * maxLength | 0) },
  () => source.splice(Math.random() * source.length | 0, 1)[0],
);

function createLocationLat() {
  const lat = getRandomIntFromRange(35.65000, 35.70000, 5);
  location1.lat = lat;
  return location1.lat;
}

function createLocationLng() {
  const lng = getRandomIntFromRange(139.70000, 139.80000, 5);
  location1.lng = lng;
  return location1.lng;
}

function createAddress() {
  const address = `${location1.lat}, ${location1.lng}`;
  return address;
}

function createFlatNearby() {
  const author = {
    avatar: getAvatar(),
  };

  const location2 = {
    lat: createLocationLat(),
    lng: createLocationLng(),
  };

  const offer = {
    title: 'Дом',
    address: createAddress(),
    price: getPrice(),
    type: getType(),
    rooms: getRooms(),
    guests: getGuests(),
    checkin: getCheckin(),
    checkout: getCheckout(),
    features: createArray(FEATURES, getRandomIntFromRange(0, FEATURES.length - 1)),
    description: 'Прекрасный выбор!',
    photos: createArray(PHOTOS, getRandomIntFromRange(0, PHOTOS.length - 1)),
  };

  return {author: author, offer: offer, location: location2};
}

export {createFlatNearby};
