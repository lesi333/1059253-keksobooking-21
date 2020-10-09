"use strict";

(() => {
  const mapPinsList = document.querySelector(`.map__pins`);

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

  window.onRenderPinsLoadSuccess = (pin) => {
    const fragment = document.createDocumentFragment();
    const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const PIN_NUMBERS = 8;
    for (let i = 0; i < PIN_NUMBERS; i++) {
      fragment.appendChild(createMapPin(mapPinTemplate, pin[i]));
    }
    mapPinsList.appendChild(fragment);
  };

  window.pin = {
    createMapPin
  };
})();
