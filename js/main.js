"use strict";
const mapPinsList = document.querySelector(`.map__pins`);

const TITLE = [`Роскошный королевский дворец`, `Прекрасный дворец с огромными окнами в пол`, `Милая уютная квартирка`, `Просторная квартира с прекрасным видом`, `Уютный домик у моря в греческом стиле`, `Шикарный дом с видом на горы`, `Тихое и романтичное бунгало`, `Бунгало на побережье океана`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];

const getRandomMinMaxElement = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createMapContent = () => {
  const mapsContent = [];

  for (let i = 1; i < 9; i++) {
    const locations = {
      x: getRandomMinMaxElement(150, 700),
      y: getRandomMinMaxElement(130, 630),
    };
    const content = {
      author: {
        avatar: `img/avatars/user0` + i + `.png`,
      },
      location: {
        x: locations.x,
        y: locations.y,
      },
      offer: {
        title: TITLE[i],
        address: locations.x + `, ` + locations.y,
        price: getRandomMinMaxElement(1000, 1000000),
        rooms: getRandomMinMaxElement(1, 5),
        guests: getRandomMinMaxElement(1, 20),
        checkin: CHECKIN[getRandomMinMaxElement(0, 2)],
        checkout: CHECKOUT[getRandomMinMaxElement(0, 2)],
        description: ``,
        features: FEATURES.slice(0, getRandomMinMaxElement(0, 5)),
        photos: PHOTOS.slice(0, getRandomMinMaxElement(0, 2)),
      },
    };

    mapsContent.push(content);
  }
  return mapsContent;
};

document.querySelector(`.map`).classList.remove(`map--faded`);

const createMapPin = (template, content) => {
  const mapPinElement = template.cloneNode(true);
  mapPinElement.firstChild.src = content.author.avatar;
  mapPinElement.firstChild.alt = content.offer.title;
  mapPinElement.style.left = content.location.x + 50 + `px`;
  mapPinElement.style.top = content.location.y + 50 + `px`;
  return mapPinElement;
};

const generateMapPins = (mapsContent) => {
  const fragment = document.createDocumentFragment();
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  for (let i = 0; i < mapsContent.length; i++) {
    fragment.appendChild(createMapPin(mapPinTemplate, mapsContent[i]));
  }
  mapPinsList.appendChild(fragment);
};

generateMapPins(createMapContent());
