"use strict";

(() => {
  const mapPinsList = document.querySelector(`.map__pins`);

  window.createMapPin = (template, content) => {
    const mapPinElement = template.cloneNode(true);
    mapPinElement.firstChild.src = content.author.avatar;
    mapPinElement.firstChild.alt = content.offer.title;
    mapPinElement.style.left = content.location.x + window.util.mainPinParam.MAIN_PIN_WIDTH + `px`;
    mapPinElement.style.top = content.location.y + window.util.mainPinParam.MAIN_PIN_HEIGHT + `px`;

    mapPinElement.addEventListener(`click`, () => {
      window.renderCard(content);
    });
    return mapPinElement;
  };

  window.renderPins = (mapsContent) => {
    const fragment = document.createDocumentFragment();
    const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    for (let i = 0; i < mapsContent.length; i++) {
      fragment.appendChild(window.createMapPin(mapPinTemplate, mapsContent[i]));
    }
    mapPinsList.appendChild(fragment);
  };
})();
