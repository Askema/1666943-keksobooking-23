import './util.js';
import './similar.js';
import './form.js';
import { getData } from './data.js';
import './form-validate.js';
import { createSimilarMarker } from './map.js';
import './form-popup.js';
import { setFilteredAds} from './filter.js';

const AMOUNT_SIMILAR_MARKERS = 10;

const filters = document.querySelector('.map__filters');

getData().then((data) => createSimilarMarker(data.slice(0, AMOUNT_SIMILAR_MARKERS)));

filters.addEventListener('change', () => {
  setFilteredAds();
});
