'use strict';

(() => {
  const templateCard = document.querySelector(`#card`);

  const houseTypes = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };

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

  window.createCard = (cardsContent) => {
    const mapCardTemplate = templateCard.content.querySelector(`.popup`);
    const mapCard = mapCardTemplate.cloneNode(true);

    mapCard.querySelector(`.popup__title`).textContent = cardsContent.offer.title;
    mapCard.querySelector(`.popup__text--address`).textContent = cardsContent.offer.address;
    mapCard.querySelector(`.popup__text--price`).textContent = cardsContent.offer.price + `₽/ночь`;
    mapCard.querySelector(`.popup__type`).textContent = houseTypes[cardsContent.offer.type];
    mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + cardsContent.offer.checkin + `, выезд до ` + cardsContent.offer.checkout;
    mapCard.querySelector(`.popup__avatar`).src = cardsContent.author.avatar;

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
    mapCard.querySelector(`.popup__close`).addEventListener(`click`, () => {
      window.closeCard();
    });
    mapCard.querySelector(`.popup__close`).addEventListener(`keydown`, window.onCardEnterPress);
    document.addEventListener(`keydown`, window.onCardEscPress);

    return mapCard;
  };
})();
