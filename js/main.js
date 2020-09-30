"use strict";

const mapPinsList = document.querySelector(`.map__pins`);
const mapFilters = document.querySelector(`.map__filters-container`);
const templateCard = document.querySelector(`#card`);
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
        guests: getRandomMinMaxElement(1, 10),
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

const renderPins = (mapsContent) => {
  const fragment = document.createDocumentFragment();
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  for (let i = 0; i < mapsContent.length; i++) {
    fragment.appendChild(createMapPin(mapPinTemplate, mapsContent[i]));
  }
  mapPinsList.appendChild(fragment);
};

const DATA = createMapContent();
renderPins(DATA);

const checkElementForData = (content, element) => {
  if (!content) {
    element.style.display = `none`;
  }
};

const compareQuantityRoomsGuests = (container, dataRooms, dataGuests) => {
  container.textContent = dataRooms + ` комнаты для ` + dataGuests + ` гостей`;
  if (dataRooms === 1 && dataGuests === 1) {
    container.textContent = dataRooms + ` комната для ` + dataGuests + ` гостя`;
  } else if (dataRooms === 1) {
    container.textContent = dataRooms + ` комната для ` + dataGuests + ` гостей`;
  } else if (dataRooms === 5 && dataGuests === 1) {
    container.textContent = dataRooms + ` комнат для ` + dataGuests + ` гостя`;
  } else if (dataRooms === 5) {
    container.textContent = dataRooms + ` комнат для ` + dataGuests + ` гостей`;
  }
};

const renderPhotos = (container, data) => {
  container.innerHTML = ``;
  data.forEach((src) => {
    const photoCreateElement = document.createElement(`img`);
    photoCreateElement.classList.add(`popup__photo`);
    photoCreateElement.setAttribute(`width`, `45`);
    photoCreateElement.setAttribute(`height`, `40`);
    photoCreateElement.src = src;
    container.appendChild(photoCreateElement);
  });
};

const renderFeatures = (container, data) => {
  container.innerHTML = ``;
  data.forEach((feature) => {
    const featureCreateElement = document.createElement(`li`);
    featureCreateElement.classList.add(`popup__feature`);
    featureCreateElement.classList.add(`popup__feature--` + feature);
    container.appendChild(featureCreateElement);
  });
};

const createCard = (cardsContent) => {
  const mapCardTemplate = templateCard.content.querySelector(`.popup`);
  const mapCard = mapCardTemplate.cloneNode(true);

  mapCard.querySelector(`.popup__title`).textContent = cardsContent.offer.title;
  mapCard.querySelector(`.popup__text--address`).textContent = cardsContent.offer.address;
  mapCard.querySelector(`.popup__text--price`).textContent = cardsContent.offer.price + `₽/ночь`;
  mapCard.querySelector(`.popup__type`).textContent = houseTypes[cardsContent.offer.type];
  mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + cardsContent.offer.checkin + `, выезд до ` + cardsContent.offer.checkout;

  checkElementForData(cardsContent.offer.title, mapCard.querySelector(`.popup__title`));
  checkElementForData(cardsContent.offer.address, mapCard.querySelector(`.popup__text--address`));
  checkElementForData(cardsContent.offer.price, mapCard.querySelector(`.popup__text--price`));
  checkElementForData(cardsContent.offer.type, mapCard.querySelector(`.popup__type`));
  checkElementForData(cardsContent.offer.checkin, mapCard.querySelector(`.popup__text--time`));
  checkElementForData(cardsContent.offer.checkout, mapCard.querySelector(`.popup__text--time`));
  checkElementForData(cardsContent.offer.features, mapCard.querySelector(`.popup__features`));
  checkElementForData(cardsContent.offer.description, mapCard.querySelector(`.popup__description`));
  checkElementForData(cardsContent.offer.photos, mapCard.querySelector(`.popup__photos`));
  checkElementForData(cardsContent.author.avatar, mapCard.querySelector(`.popup__avatar`));

  renderFeatures(mapCard.querySelector(`.popup__features`), cardsContent.offer.features);
  renderPhotos(mapCard.querySelector(`.popup__photos`), cardsContent.offer.photos);
  compareQuantityRoomsGuests(mapCard.querySelector(`.popup__text--capacity`), cardsContent.offer.rooms, cardsContent.offer.guests);

  mapFilters.insertAdjacentElement(`beforebegin`, mapCard);
  return mapCard;
};

const renderCard = (card) => {
  mapFilters.insertAdjacentElement(`beforebegin`, createCard(card));
};

renderCard(DATA[0]);
