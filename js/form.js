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
const avatarInput = adForm.querySelector(`.ad-form-header__input`);
const avatarImage = adForm.querySelector(`.ad-form-header__preview img`);
const imagesInput = adForm.querySelector(`.ad-form__input`);
const imageHousing = adForm.querySelector(`.ad-form__photo`);

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const fileTypes = [`gif`, `jpg`, `jpeg`, `png`];

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

const loadingImage = (evt, target) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = fileTypes.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    target.src = ``;

    reader.addEventListener(`load`, (event) => {
      target.src = event.target.result;
    });

    reader.readAsDataURL(file);
  }
};

const onAvatarLoad = (evt) => {
  loadingImage(evt, avatarImage);
};

const onPhotoHousingLoad = (evt) => {
  imageHousing.innerHTML = ``;
  imageHousing.appendChild(getNewPhoto(evt));
};

const getNewPhoto = (evt) => {
  const file = document.createElement(`img`);

  file.setAttribute(`alt`, `Фотография жилья`);
  file.setAttribute(`height`, `100%`);
  file.setAttribute(`width`, `100%`);
  file.style.borderRadius = `5px`;

  loadingImage(evt, file);
  return file;
};

avatarInput.addEventListener(`change`, onAvatarLoad);
imagesInput.addEventListener(`change`, onPhotoHousingLoad);

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

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener(`change`, onTimeInChange);
timeOut.addEventListener(`change`, onTimeOutChange);


const validateTitle = () => {
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

titleAdForm.addEventListener(`input`, () => {
  validateTitle();
});

window.form = {
  checkRooms,
  validateType,
  setAddressOnPageNotActive,
  onAvatarLoad,
  onPhotoHousingLoad
};
