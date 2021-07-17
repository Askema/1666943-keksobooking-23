import { getAdverts } from './data.js';
import { createSimilarMarker, clearMarker } from './map.js';
import { isMatchedFilter, isMatchedPrice, isMatchedFeatures, debounce } from './util.js';

const SIMILAR_FLATS_COUNT = 10;
const TIMEOUT_DELAY = 500;
const filters = document.querySelector('.map__filters');
const housingType = filters.querySelector('#housing-type');
const housingPrice = filters.querySelector('#housing-price');
const housingRooms = filters.querySelector('#housing-rooms');
const housingGuests = filters.querySelector('#housing-guests');

const filtersAds = () => {
  clearMarker();
  createSimilarMarker(getAdverts()
    .filter((data) =>
      isMatchedFilter(data.offer.type, housingType.value)
      && isMatchedPrice(data.offer.price, housingPrice.value)
      && isMatchedFilter(data.offer.rooms, housingRooms.value)
      && isMatchedFilter(data.offer.guests, housingGuests.value)
      && isMatchedFeatures(data.offer.features))
    .slice(0, SIMILAR_FLATS_COUNT));
};

const setFilteredAds = debounce(filtersAds, TIMEOUT_DELAY);

export { setFilteredAds };
