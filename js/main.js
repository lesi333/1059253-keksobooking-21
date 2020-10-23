"use strict";

const map = document.querySelector(`.map`);
const mapPinsList = document.querySelector(`.map__pins`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const filterForm = document.querySelector(`.map__filters`);
const filterFormSelectElements = filterForm.querySelectorAll(`.map__filter`);
const filterFormFeaturesElement = filterForm.querySelector(`.map__features`);
const adForm = document.querySelector(`.ad-form`);
const adFormHeader = adForm.querySelector(`.ad-form-header`);
const adFormElements = adForm.querySelectorAll(`.ad-form__element`);
const resetAdForm = document.querySelector(`.ad-form__reset`);
const typeAdForm = adForm.querySelector(`#type`);
const roomNumberElements = adForm.querySelector(`#room_number`);
const templateSuccessForm = document.querySelector(`#success`).content.querySelector(`.success`);
const templateErrorForm = document.querySelector(`#error`).content.querySelector(`.error`);
const pinMainPositionLeft = mapPinMain.style.left;
const pinMainPositionTop = mapPinMain.style.top;

const disabledForm = (elementFieldset) => {
  for (let i = 0; i < adFormElements.length; i++) {
    adFormElements[i].disabled = true;
  }
  elementFieldset.disabled = true;
};

const disabledMapFilters = () => {
  filterFormSelectElements.forEach((element) => {
    element.disabled = true;
  });
  filterFormFeaturesElement.disabled = true;

  filterForm.reset();
  filterForm.removeEventListener(`change`, window.debounce(window.filter.onUpdatePinOnFilters));
};

const activationMapFilters = () => {
  filterFormSelectElements.forEach((element) => {
    element.disabled = false;
  });
  filterFormFeaturesElement.disabled = false;

  filterForm.addEventListener(`change`, window.debounce(window.filter.onUpdatePinOnFilters));
};

disabledForm(adFormHeader);
disabledMapFilters();

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
  activationMapFilters();
  window.form.checkRooms(roomNumberElements.value);
  window.form.validateType(typeAdForm.value);
  window.backend.load(window.filter.onDataLoadSuccess, window.util.onShowError);
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

  clearForm();
  window.deletePins();

  mapPinMain.style.left = pinMainPositionLeft;
  mapPinMain.style.top = pinMainPositionTop;
  window.form.setAddressOnPageNotActive();

  map.classList.add(`map--faded`);
  disabledForm(adFormHeader);
  disabledMapFilters();

  adForm.classList.add(`ad-form--disabled`);

  typeAdForm.removeEventListener(`change`, window.form.validateType);
  roomNumberElements.removeEventListener(`change`, window.form.checkRooms);

  mapPinMain.addEventListener(`mousedown`, onPinMouseDown);
  mapPinMain.addEventListener(`keydown`, onPinKeyDown);
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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  window.backend.save(new FormData(adForm), onFormSendSuccess, onFormSendError);
};

adForm.addEventListener(`submit`, onFormSubmit);

resetAdForm.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  clearForm();
});
