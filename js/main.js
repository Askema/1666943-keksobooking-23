import './util.js';
import { createFlatNearby } from './data.js';
import { similarFlats } from './similar.js';
import {activeForm} from './form.js';
import './form-validate.js';

const canvas = document.querySelector('#map-canvas');
const APARTAMENTS_COUNT = 1;
const createFlatsNearby = () => new Array(APARTAMENTS_COUNT).fill(null).map(() => createFlatNearby());

const dataElement = createFlatsNearby()[0];

canvas.append(similarFlats(dataElement));

activeForm();
