'use strict';

const mapPinMain = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const roomNumberElements = adForm.querySelector(`#room_number`);
const capacityElements = adForm.querySelector(`#capacity`);
const titleAdForm = adForm.querySelector(`#title`);
const typeAdForm = adForm.querySelector(`#type`);
const priceAdForm = adForm.querySelector(`#price`);
const timeIn = adForm.querySelector(`#timein`);
const timeOut = adForm.querySelector(`#timeout`);
const addressInput = adForm.querySelector(`#address`);

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const minHousingPrice = {
  bungalow: `0`,
  flat: `1000`,
  house: `5000`,
  palace: `10000`
};

const setAddressOnPageNotActive = () => {
  addressInput.value = parseInt(mapPinMain.style.left, 10) + window.util.mainPinParam.MAIN_PIN_WIDTH / 2 + `, ` + (parseInt(mapPinMain.style.top, 10) + window.util.mainPinParam.MAIN_PIN_HEIGHT / 2);
};

setAddressOnPageNotActive();

window.setAddressOnPageActive = () => {
  addressInput.value = parseInt(mapPinMain.style.left, 10) + window.util.mainPinParam.MAIN_PIN_WIDTH / 2 + `, ` + (parseInt(mapPinMain.style.top, 10) + window.util.mainPinParam.MAIN_PIN_HEIGHT);
};

const checkRooms = (peopleAmount) => {
  const seatingCapacityOptions = capacityElements.querySelectorAll(`option`);

  seatingCapacityOptions.forEach((option) => {
    option.disabled = true;
  });

  roomValues[peopleAmount].forEach((seatsAmount) => {
    seatingCapacityOptions.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

roomNumberElements.addEventListener(`change`, (evt) => {
  checkRooms(evt.target.value);
});

const validateType = () => {
  const typeForm = typeAdForm.value;
  const minPrice = minHousingPrice[typeForm];
  priceAdForm.min = minPrice;
  priceAdForm.placeholder = minPrice;
};

typeAdForm.addEventListener(`change`, () => {
  validateType();
});

const onChangeTimeIn = () => {
  timeOut.value = timeIn.value;
};

const onChangeTimeOut = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener(`change`, onChangeTimeIn);
timeOut.addEventListener(`change`, onChangeTimeOut);


const onCheckTitleValidity = () => {
  const valueLength = titleAdForm.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleAdForm.setCustomValidity(`Ещё ` + (MIN_TITLE_LENGTH - valueLength) + `симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleAdForm.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + `симв.`);
  } else {
    titleAdForm.setCustomValidity(``);
  }

  titleAdForm.reportValidity();
};

titleAdForm.addEventListener(`input`, onCheckTitleValidity);

window.form = {
  checkRooms,
  validateType,
  setAddressOnPageNotActive
};
