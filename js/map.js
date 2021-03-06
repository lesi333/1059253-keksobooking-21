'use strict';

const map = document.querySelector(`.map`);

const closeCard = () => {
  const cardElement = map.querySelector(`.map__card`);
  if (cardElement) {
    map.removeChild(cardElement);
    document.removeEventListener(`keydown`, onCardEscPress);
  }
};

const onCardEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
};

const onCardEnterPress = (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    closeCard();
  }
};

window.renderCard = (data) => {
  const card = document.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
  map.appendChild(window.createCard(data));
};

window.map = {
  closeCard,
  onCardEscPress,
  onCardEnterPress
};
