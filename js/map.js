import { roundOff } from './util.js';
import { similarFlats } from './similar.js';
import { activeForm } from './form.js';
import { getAdverts } from './data.js';

const LAT_CENTER_TOKYO = 35.68247;
const LNG_CENTER_TOKYO = 139.75281;
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const ICON_SIZE = [40, 40];
const ICON_ANCHOR = [20, 40];
const MAIN_ICON_SRC = 'img/main-pin.svg';
const ICON_SRC = 'img/pin.svg';
const AMOUNT_SIMILAR_MARKERS = 10;

const canvas = document.querySelector('#map-canvas');
const addressInput = document.querySelector('#address');
const filters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const reset = adForm.querySelector('.ad-form__reset');
const price = adForm.querySelector('#price');

addressInput.value = `${LAT_CENTER_TOKYO}, ${LNG_CENTER_TOKYO}`;

const map = L.map(canvas);
map.on('load', () => {
  activeForm();
});

map.setView({
  lat: LAT_CENTER_TOKYO,
  lng: LNG_CENTER_TOKYO,
}, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_ICON_SRC,
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();
  addressInput.value = `${roundOff(address.lat)}, ${roundOff(address.lng)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createSimilarMarker = (similarAds) => {
  similarAds.forEach((data) => {
    const { lat, lng } = data.location;
    const icon = L.icon({
      iconUrl: ICON_SRC,
      iconSize: ICON_SIZE,
      iconAnchor: ICON_ANCHOR,
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(
        similarFlats(data),
        {
          keepInView: true,
        },
      );
  });
};

const setMainMarker = () => {
  mainPinMarker.setLatLng({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  });
  map.setView({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  }, 13);
  addressInput.value = `${LAT_CENTER_TOKYO}, ${LNG_CENTER_TOKYO}`;
};

const clearMarker = () => {
  markerGroup.clearLayers();
  setMainMarker();
};

const restoreData = () => {
  filters.reset();
  adForm.reset();
  clearMarker();
  createSimilarMarker(getAdverts().slice(0, AMOUNT_SIMILAR_MARKERS));
  price.min = 1000;
  price.placeholder = 1000;
};

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreData();
});

export { createSimilarMarker, clearMarker, restoreData };
