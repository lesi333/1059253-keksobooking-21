"use strict";

const map = document.querySelector(`.map`);
const mapPinsList = document.querySelector(`.map__pins`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapFilters = document.querySelector(`.map__filters-container`);
const adForm = document.querySelector(`.ad-form`);
const adFormHeader = adForm.querySelector(`.ad-form-header`);
const adFormElements = adForm.querySelectorAll(`.ad-form__element`);
const resetAdForm = document.querySelector(`.ad-form__reset`);
const templateSuccessForm = document.querySelector(`#success`).content.querySelector(`.success`);
const templateErrorForm = document.querySelector(`#error`).content.querySelector(`.error`);

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


const onSuccessPopupClick = (evt) => {
  if (evt.button === 0 || evt.key === `Escape`) {
    adForm.querySelector(`.success`).remove();
    document.removeEventListener(`keydown`, onSuccessPopupClick);
    document.removeEventListener(`mouseup`, onSuccessPopupClick);
  }
};

const clearForm = () => {
  adForm.reset();
};

const onFormSendSuccess = () => {
  const successPopup = templateSuccessForm.cloneNode(true);

  document.addEventListener(`keydown`, onSuccessPopupClick);
  document.addEventListener(`mouseup`, onSuccessPopupClick);
  adForm.appendChild(successPopup);

  disabledForm(adFormHeader, mapFilters);
  clearForm();
};

const onFormSendError = (errorMessage) => {
  const errorPopup = templateErrorForm.cloneNode(true);
  const errorButton = errorPopup.querySelector(`.error__button`);
  const closeButton = document.createElement(`button`);

  const onErrorPopupClick = (evt) => {
    if (evt.button === 0 || evt.key === `Escape`) {
      mapPinsList.querySelector(`.error`).remove();
      closeButton.removeEventListener(`mouseup`, onErrorPopupClick);
      document.removeEventListener(`keydown`, onErrorPopupClick);
    }
  };

  const tryAgainSend = (evt) => {
    onErrorPopupClick(evt);
    if (window.load.loadType === `GET`) {
      window.load(window.onRenderPinsLoadSuccess, onShowError);
    } else {
      window.save(new FormData(adForm), onFormSendSuccess, onFormSendError);
    }
    errorButton.removeEventListener(`mouseup`, tryAgainSend);
  };

  errorPopup.querySelector(`.error__message`).textContent = errorMessage;
  errorButton.addEventListener(`mouseup`, tryAgainSend);

  closeButton.classList.add(`error__button`);
  closeButton.textContent = `Закрыть`;

  closeButton.addEventListener(`mouseup`, onErrorPopupClick);
  document.addEventListener(`keydown`, onErrorPopupClick);

  errorPopup.appendChild(closeButton);
  mapPinsList.appendChild(errorPopup);
};

adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.save(new FormData(adForm), onFormSendSuccess, onFormSendError);
});

resetAdForm.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  clearForm();
});
