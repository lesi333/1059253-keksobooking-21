"use strict";
const mapPinsList = document.querySelector(`.map__pins`);
const mapFilters = document.querySelector(`.map__filters-container`);

const TITLE = [`Роскошный королевский дворец`, `Прекрасный дворец с огромными окнами в пол`, `Милая уютная квартирка`, `Просторная квартира с прекрасным видом`, `Уютный домик у моря в греческом стиле`, `Шикарный дом с видом на горы`, `Тихое и романтичное бунгало`, `Бунгало на побережье океана`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = [
  `Шикарный дворец в одном из фешенебельных районов Токио. Подходит для ценителей старинного антиквариатаю. Здесь Вы можете стать частью искусства.`,
  `Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.`,
  `Небольшая, но очень уютная квартирка в тихом квартале Токио. Невысокая цена за аренду и есть все необходимые удобства. Добраться до центра можно всего за 15 минут.`,
  `Это прекрасная квартира с замечательным видом на Японское море. Здесь Вы можете насладиться прекрасными закатами не выходя из квартиры.`,
  `Если находясь на другом краю света Вы хотите побывать в Греции, Вам сюда. Этот уютный домик в греческом стиле позволит почуствовать Вам, что Вы очутились на знаменитом греческом курорте - Санторини.`,
  `Если Вы хотите дышать свежим горным воздухом не выходя из дома, то милости просим. Этот шикарный дом находится близ горы Такао. Здесь замечательный чистый горный воздух.`,
  `Это тихое и романтичное бунгало неподалеку от Наго. Несмотря на удаленность от города, Вы также cможете постоянно быть на связи, так как Busena Terrace Beach Hotel предлагает всем гостям бесплатный Wi-Fi.`,
  `Прекрасное и просторное бунгало на побережье Тихого океана. Здесь Вы сможете по-настоящему расслабиться и познакомиться поближе с океанскими жителями, погрузившись с аквалангом.`
];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const houseTypes = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`,
};

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
        type: TYPES[getRandomMinMaxElement(0, 3)],
        rooms: getRandomMinMaxElement(1, 5),
        guests: getRandomMinMaxElement(1, 20),
        checkin: CHECKIN[getRandomMinMaxElement(0, 2)],
        checkout: CHECKOUT[getRandomMinMaxElement(0, 2)],
        description: DESCRIPTION[i],
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

const hideElement = (content, element) => {
  if (!content) {
    element.style.display = `none`;
  }
};

// const compareQuantity = (cardsContent) => {
//  if (cardsContent.offer.rooms === 1 && cardsContent.offer.guests === 1) {
//    document.querySelector(`#card`).content.querySelector(`.popup__text--capacity`).textContent = cardsContent.offer.rooms + ` комната для ` + cardsContent.offer.guests + ` гостя`;
//  } else if (cardsContent.offer.rooms === 5 && cardsContent.offer.guests === 1) {
//    document.querySelector(`#card`).content.querySelector(`.popup__text--capacity`).textContent = cardsContent.offer.rooms + ` комнат для ` + cardsContent.offer.guests + ` гостя`;
//  } else if (cardsContent.offer.rooms === 5) {
//    document.querySelector(`#card`).content.querySelector(`.popup__text--capacity`).textContent = cardsContent.offer.rooms + ` комнат для ` + cardsContent.offer.guests + ` гостей`;
//  }
// };

const renderPhotos = (conatiner, cardsContent) => {
  conatiner.remove();
  cardsContent.forEach((photo) => {
    const photoElementCopy = document.querySelector(`#card`).content.querySelector(`.popup__photo`).cloneNode(true);
    photoElementCopy.src = photo;
    document.querySelector(`#card`).content.querySelector(`.popup__photos`).appendChild(photoElementCopy);
  });
};

const renderFeatures = (container, data) => {
  data.forEach((feature) => {
    container.innerHTML = ``;
    // console.log(container);
    const featureCreateElement = document.createElement(`li`);
    featureCreateElement.classList.add(`popup__feature`);
    featureCreateElement.classList.add(`popup__feature--` + feature);
    document.querySelector(`#card`).content.querySelector(`.popup__features`).appendChild(featureCreateElement);
    // console.log(document.querySelector(`#card`).content.querySelector(`.popup__features`));

  });
};

const generateMapCards = (cardsContent) => {
  const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
  const mapCardElement = mapCardTemplate.cloneNode(true);

  renderFeatures(mapCardElement.querySelector(`.popup__features`), cardsContent.offer.features);
  // console.log(mapCardElement.querySelector(`.popup__features`));
  mapCardElement.querySelector(`.popup__title`).textContent = cardsContent.offer.title;
  mapCardElement.querySelector(`.popup__text--address`).textContent = cardsContent.offer.address;
  mapCardElement.querySelector(`.popup__text--price`).textContent = cardsContent.offer.price + `₽/ночь`;
  mapCardElement.querySelector(`.popup__type`).textContent = houseTypes[cardsContent.offer.type];
  mapCardElement.querySelector(`.popup__text--capacity`).textContent = cardsContent.offer.rooms + ` комнаты для ` + cardsContent.offer.guests + ` гостей`;

  if (cardsContent.offer.rooms === 1 && cardsContent.offer.guests === 1) {
    mapCardElement.querySelector(`.popup__text--capacity`).textContent = cardsContent.offer.rooms + ` комната для ` + cardsContent.offer.guests + ` гостя`;
  } else if (cardsContent.offer.rooms === 5 && cardsContent.offer.guests === 1) {
    mapCardElement.querySelector(`.popup__text--capacity`).textContent = cardsContent.offer.rooms + ` комнат для ` + cardsContent.offer.guests + ` гостя`;
  } else if (cardsContent.offer.rooms === 5) {
    mapCardElement.querySelector(`.popup__text--capacity`).textContent = cardsContent.offer.rooms + ` комнат для ` + cardsContent.offer.guests + ` гостей`;
  }
  mapCardElement.querySelector(`.popup__features`).innerHTML = ``;
  mapCardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + cardsContent.offer.checkin + `, выезд до ` + cardsContent.offer.checkout;

  renderPhotos(mapCardElement.querySelector(`.popup__photos`), cardsContent.offer.photos);

  mapCardElement.querySelector(`.popup__description`).textContent = cardsContent.offer.description;
  mapCardElement.querySelector(`.popup__avatar`).src = cardsContent.author.avatar;

  hideElement(cardsContent.offer.title, mapCardElement.querySelector(`.popup__title`));
  hideElement(cardsContent.offer.address, mapCardElement.querySelector(`.popup__text--address`));
  hideElement(cardsContent.offer.price, mapCardElement.querySelector(`.popup__text--price`));
  hideElement(cardsContent.offer.type, mapCardElement.querySelector(`.popup__type`));
  hideElement(cardsContent.offer.rooms, mapCardElement.querySelector(`.popup__text--capacity`));
  hideElement(cardsContent.offer.guests, mapCardElement.querySelector(`.popup__text--capacity`));
  hideElement(cardsContent.offer.checkin, mapCardElement.querySelector(`.popup__text--time`));
  hideElement(cardsContent.offer.checkout, mapCardElement.querySelector(`.popup__text--time`));
  hideElement(cardsContent.offer.features, mapCardElement.querySelector(`.popup__features`));
  hideElement(cardsContent.offer.description, mapCardElement.querySelector(`.popup__description`));
  hideElement(cardsContent.offer.photos, mapCardElement.querySelector(`.popup__photos`));
  hideElement(cardsContent.author.avatar, mapCardElement.querySelector(`.popup__avatar`));

  mapFilters.insertAdjacentElement(`beforebegin`, mapCardElement);
};

const mapContent = createMapContent();
generateMapCards(mapContent[3]);
