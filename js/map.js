'use strict';

(() => {
  const map = document.querySelector(`.map`);

  window.closeCard = () => {
    const cardElement = map.querySelector(`.map__card`);
    map.removeChild(cardElement);
    document.removeEventListener(`keydown`, window.onCardEscPress);
  };

  window.onCardEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.closeCard();
    }
  };

  window.onCardEnterPress = (evt) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      window.closeCard();
    }
  };

  window.renderCard = (data) => {
    const card = document.querySelector(`.map__card`);
    if (card) {
      card.remove();
    }
    map.appendChild(window.createCard(data));
  };
})();
