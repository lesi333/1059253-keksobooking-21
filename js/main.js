"use strict";

const map = document.querySelector(`.map`);
const mapPinsList = document.querySelector(`.map__pins`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapFilters = document.querySelector(`.map__filters-container`);

const adForm = document.querySelector(`.ad-form`);
const adFormHeader = adForm.querySelector(`.ad-form-header`);
const adFormElements = adForm.querySelectorAll(`.ad-form__element`);

const DATA = window.createMapContent();
const renderPins = (mapsContent) => {
  const fragment = document.createDocumentFragment();
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  for (let i = 0; i < mapsContent.length; i++) {
    fragment.appendChild(window.createMapPin(mapPinTemplate, mapsContent[i]));
  }
  mapPinsList.appendChild(fragment);
};

const disabledForm = (elementFieldset) => {
  for (let i = 0; i < adFormElements.length; i++) {
    adFormElements[i].disabled = true;
  }
  elementFieldset.disabled = true;
};

disabledForm(adFormHeader, mapFilters);

const activationOfForm = (elementFieldset) => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  for (let i = 0; i < adFormElements.length; i++) {
    adFormElements[i].disabled = false;
  }
  elementFieldset.disabled = false;
};

const activatePage = () => {
  activationOfForm(adFormHeader);
  window.setAddressOnPageActive();
  renderPins(DATA);
};

const onPinMouseDown = (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
  mapPinMain.removeEventListener(`mousedown`, onPinMouseDown);
};

const onPinKeyDown = (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
  mapPinMain.removeEventListener(`keydown`, onPinMouseDown);
};

mapPinMain.addEventListener(`mousedown`, onPinMouseDown);
mapPinMain.addEventListener(`keydown`, onPinKeyDown);
