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

const generateMapCards = (cardsContent) => {
  const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
  const mapCardElement = mapCardTemplate.cloneNode(true);

  const titleCardElement = mapCardElement.querySelector(`.popup__title`);
  const addressCardElement = mapCardElement.querySelector(`.popup__text--address`);
  const priceCardElement = mapCardElement.querySelector(`.popup__text--price`);
  const typeCardElement = mapCardElement.querySelector(`.popup__type`);
  const capacityCardElement = mapCardElement.querySelector(`.popup__text--capacity`);
  const timeCardElement = mapCardElement.querySelector(`.popup__text--time`);
  const featuresCardList = mapCardElement.querySelector(`.popup__features`);
  const featureCardElements = mapCardElement.querySelectorAll(`.popup__feature`);
  const descriptionCardElement = mapCardElement.querySelector(`.popup__description`);
  const photoCardList = mapCardElement.querySelector(`.popup__photos`);
  const photoCardElements = mapCardElement.querySelector(`.popup__photo`);
  const avatarCardElement = mapCardElement.querySelector(`.popup__avatar`);

  titleCardElement.textContent = cardsContent.offer.title;
  addressCardElement.textContent = cardsContent.offer.address;
  priceCardElement.textContent = cardsContent.offer.price + `₽/ночь`;
  typeCardElement.textContent = houseTypes[cardsContent.offer.type];
  capacityCardElement.textContent = cardsContent.offer.rooms + ` комнаты для ` + cardsContent.offer.guests + ` гостей`;

  if (cardsContent.offer.rooms === 1 && cardsContent.offer.guests === 1) {
    capacityCardElement.textContent = cardsContent.offer.rooms + ` комната для ` + cardsContent.offer.guests + ` гостя`;
  } else if (cardsContent.offer.rooms === 5 && cardsContent.offer.guests === 1) {
    capacityCardElement.textContent = cardsContent.offer.rooms + ` комнат для ` + cardsContent.offer.guests + ` гостя`;
  } else if (cardsContent.offer.rooms === 5) {
    capacityCardElement.textContent = cardsContent.offer.rooms + ` комнат для ` + cardsContent.offer.guests + ` гостей`;
  }

  timeCardElement.textContent = `Заезд после ` + cardsContent.offer.checkin + `, выезд до ` + cardsContent.offer.checkout;

  featureCardElements.forEach((element) => {
    element.remove();
  });

  if (cardsContent.offer.features) {
    for (let i = 0; i < cardsContent.offer.features.length; i++) {
      const featureCreateElement = document.createElement(`li`);
      featureCreateElement.classList.add(`popup__feature`);
      featureCreateElement.classList.add(`popup__feature--` + cardsContent.offer.features[i]);
      featuresCardList.appendChild(featureCreateElement);
    }
  }
  descriptionCardElement.textContent = cardsContent.offer.description;

  if (cardsContent.offer.photos) {
    photoCardElements.remove();

    for (let i = 0; i < cardsContent.offer.photos.length; i++) {
      const photoElementCopy = photoCardElements.cloneNode(true);
      photoElementCopy.src = cardsContent.offer.photos[i];
      photoCardList.appendChild(photoElementCopy);
    }
  }

  avatarCardElement.src = cardsContent.author.avatar;

  const hideElement = (content, element) => {
    if (!content) {
      element.style.display = `none`;
    }
  };

  hideElement(cardsContent.offer.title, titleCardElement);
  hideElement(cardsContent.offer.address, addressCardElement);
  hideElement(cardsContent.offer.price, priceCardElement);
  hideElement(cardsContent.offer.type, typeCardElement);
  hideElement(cardsContent.offer.rooms, capacityCardElement);
  hideElement(cardsContent.offer.guests, capacityCardElement);
  hideElement(cardsContent.offer.checkin, timeCardElement);
  hideElement(cardsContent.offer.checkout, timeCardElement);
  hideElement(cardsContent.offer.features, featuresCardList);
  hideElement(cardsContent.offer.description, descriptionCardElement);
  hideElement(cardsContent.offer.photos, photoCardList);
  hideElement(cardsContent.author.avatar, avatarCardElement);

  mapFilters.insertAdjacentElement(`beforebegin`, mapCardElement);
};

const mapContent = createMapContent();
generateMapCards(mapContent[3]);
