"use strict";

var _util = require("./util.js");

var _similar = require("./similar.js");

var _form = require("./form.js");

var _data = require("./data.js");

var canvas = document.querySelector('#map-canvas');
var addresInput = document.querySelector('#address');
var map = L.map(canvas);
map.on('load', function () {
  (0, _form.activeForm)();
});
map.setView({
  lat: 35.65283,
  lng: 139.83947
}, 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});
var pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});
var mainPinMarker = L.marker({
  lat: 35.65283,
  lng: 139.83947
}, {
  draggable: true,
  icon: mainPinIcon
});
mainPinMarker.addTo(map);
mainPinMarker.on('moveend', function (evt) {
  var address = evt.target.getLatLng();
  addresInput.value = "Lat: ".concat((0, _util.roundOff)(address.lat), ", Lng: ").concat((0, _util.roundOff)(address.lng));
});

for (var dataIndex = 0; dataIndex <= _data.dataElement.length - 1; dataIndex++) {
  var marker = L.marker({
    lat: _data.dataElement[dataIndex].location.lat,
    lng: _data.dataElement[dataIndex].location.lng
  }, {
    icon: pinIcon
  });
  (0, _form.activeForm)();
  marker.addTo(map).bindPopup((0, _similar.similarFlats)(_data.dataElement[dataIndex]), {
    keepInView: true
  });
}

var createMarker = function createMarker(point) {
  var lat = point.lat,
      lng = point.lng;
  var marker = L.marker({
    lat: lat,
    lng: lng
  }, {
    icon: pinIcon
  });
  marker.addTo(map).bindPopup((0, _similar.similarFlats)(_data.dataElement), {
    keepInView: true
  });
  return marker;
};