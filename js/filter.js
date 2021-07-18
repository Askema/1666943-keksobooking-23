import { getAdverts } from './data.js';
import { createSimilarMarker, clearMarkers } from './map.js';
import { matchFilter, matchPrice, matchFeatures, debounce } from './util.js';

const SIMILAR_FLATS_COUNT = 10;
const TIMEOUT_DELAY = 500;
const filters = document.querySelector('.map__filters');
const housingType = filters.querySelector('#housing-type');
const housingPrice = filters.querySelector('#housing-price');
const housingRooms = filters.querySelector('#housing-rooms');
const housingGuests = filters.querySelector('#housing-guests');

const filtersAds = () => {
  clearMarkers();
  createSimilarMarker(getAdverts()
    .filter((data) =>
      matchFilter(data.offer.type, housingType.value)
      && matchPrice(data.offer.price, housingPrice.value)
      && matchFilter(data.offer.rooms, housingRooms.value)
      && matchFilter(data.offer.guests, housingGuests.value)
      && matchFeatures(data.offer.features))
    .slice(0, SIMILAR_FLATS_COUNT));
};

const setFilteredAds = debounce(filtersAds, TIMEOUT_DELAY);

export { setFilteredAds };
