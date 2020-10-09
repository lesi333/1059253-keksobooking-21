'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapPinsList = document.querySelector(`.map__pins`);
  const mapPinMain = map.querySelector(`.map__pin--main`);

  const POSITION_MIN_X = 0 - (window.util.mainPinParam.MAIN_PIN_WIDTH / 2);
  const POSITION_MAX_X = mapPinsList.clientWidth - (window.util.mainPinParam.MAIN_PIN_WIDTH / 2);
  const POSITION_MIN_Y = 130 - window.util.mainPinParam.MAIN_PIN_HEIGHT;
  const POSITION_MAX_Y = 630 - window.util.mainPinParam.MAIN_PIN_HEIGHT;

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const checkPosition = (coords) => {
      if (coords.x <= POSITION_MIN_X) {
        coords.x = POSITION_MIN_X;
      }
      if (coords.x >= POSITION_MAX_X) {
        coords.x = POSITION_MAX_X;
      }
      if (coords.y <= POSITION_MIN_Y) {
        coords.y = POSITION_MIN_Y;
      }
      if (coords.y >= POSITION_MAX_Y) {
        coords.y = POSITION_MAX_Y;
      }
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let newCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      checkPosition(newCoords);

      mapPinMain.style.top = newCoords.y + `px`;
      mapPinMain.style.left = newCoords.x + `px`;

      window.setAddressOnPageActive();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
