"use strict";

const map = document.querySelector(`.map`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapFilters = document.querySelector(`.map__filters-container`);
const adForm = document.querySelector(`.ad-form`);
const adFormHeader = adForm.querySelector(`.ad-form-header`);
const adFormElements = adForm.querySelectorAll(`.ad-form__element`);

// const DATA = window.createMapContent();

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


const onShowError = (errorMessage) => {
  const node = document.createElement(`div`);

  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const activatePage = () => {
  activationOfForm(adFormHeader);
  window.setAddressOnPageActive();
  // window.renderPins(DATA);
  window.load(window.onRenderPinsLoadSuccess, onShowError);
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
