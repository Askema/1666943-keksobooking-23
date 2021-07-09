import { roundOff } from './util.js';
import { createFlatNearby } from './data.js';
import { similarFlats } from './similar.js';
import { activeForm } from './form.js';
import './form-validate.js';


const canvas = document.querySelector('#map-canvas');
const addresInput = document.querySelector('#address');

const APARTAMENTS_COUNT = 5;
const createFlatsNearby = () => new Array(APARTAMENTS_COUNT).fill(null).map(() => createFlatNearby());
const dataElement = createFlatsNearby();

const map = L.map(canvas);
map.on('load', () => {
  activeForm();
});

map.setView({
  lat: 35.65283,
  lng: 139.83947,
}, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 35.65283,
    lng: 139.83947,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();
  addresInput.value = `Lat: ${roundOff(address.lat)}, Lng: ${roundOff(address.lng)}`;
});

for (let dataIndex = 0; dataIndex <= dataElement.length - 1; dataIndex++) {
  const marker = L.marker(
    {
      lat: dataElement[dataIndex].location.lat,
      lng: dataElement[dataIndex].location.lng,
    },
    {
      icon: pinIcon,
    });

  marker
    .addTo(map)
    .bindPopup(
      similarFlats(dataElement[dataIndex]),
      {
        keepInView: true,
      },
    );
}
