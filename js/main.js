import './util.js';
import './similar.js';
import './form.js';
import { getData } from './data.js';
import './form-validate.js';
import { createSimilarMarker } from './map.js';
import './form-popup.js';

getData(createSimilarMarker);
