"use strict";

const mapPinsList = document.querySelector(`.map__pins`);
window.DATA = [];

const createMapPin = (template, content) => {
  const mapPinElement = template.cloneNode(true);
  mapPinElement.firstChild.src = content.author.avatar;
  mapPinElement.firstChild.alt = content.offer.title;
  mapPinElement.style.left = content.location.x - (window.util.pinParam.PIN_WIDTH / 2) + `px`;
  mapPinElement.style.top = content.location.y - (window.util.pinParam.PIN_HEIGHT) + `px`;

  mapPinElement.addEventListener(`click`, () => {
    window.renderCard(content);
  });
  return mapPinElement;
};

window.renderPins = (pins) => {
  const fragment = document.createDocumentFragment();
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  pins.forEach((pin) => {
    fragment.appendChild(createMapPin(mapPinTemplate, pin));
  });
  mapPinsList.appendChild(fragment);
};

window.deletePins = () => {
  const pins = mapPinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let pin of pins) {
    pin.remove();
  }
};

window.pin = {
  createMapPin
};
