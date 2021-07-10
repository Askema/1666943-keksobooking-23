import { roundOff } from './util.js';
import { similarFlats } from './similar.js';
import { activeForm } from './form.js';
import { dataElement } from './data.js';

const canvas = document.querySelector('#map-canvas');
const addresInput = document.querySelector('#address');


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

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (index) => {
  const {lat, lng} = dataElement[index].location;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [40, 20],
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
      similarFlats(dataElement[index]),
      {
        keepInView: true,
      },
    );
};

dataElement.forEach((value, index) => {
  createMarker(index);
});
