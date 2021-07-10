import { roundOff } from './util.js';
import { similarFlats } from './similar.js';
import { activeForm } from './form.js';
import { dataElement } from './data.js';

const LAT_CENTER_TOKYO = 35.65283;
const LNG_CENTER_TOKYO = 139.83947;
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const ICON_SIZE = [40, 40];
const ICON_ANCHOR = [20, 40];
const MAIN_ICON_SRC = 'img/main-pin.svg';
const ICON_SRC = 'img/pin.svg';

const canvas = document.querySelector('#map-canvas');
const addressInput = document.querySelector('#address');

addressInput.value = `${LAT_CENTER_TOKYO}, ${LNG_CENTER_TOKYO}`;

const map = L.map(canvas);
map.on('load', () => {
  activeForm();
});

map.setView({
  lat: LAT_CENTER_TOKYO,
  lng: LNG_CENTER_TOKYO,
}, 12);

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

const createMarker = (index) => {
  const {lat, lng} = dataElement[index].location;

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
      similarFlats(dataElement[index]),
      {
        keepInView: true,
      },
    );
};

dataElement.forEach((value, index) => {
  createMarker(index);
});
