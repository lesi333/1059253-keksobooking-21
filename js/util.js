'use strict';

window.util = {
  mainPinParam: {
    MAIN_PIN_WIDTH: 62,
    MAIN_PIN_HEIGHT: 84
  },

  pinParam: {
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70
  },

  onShowError: (errorMessage) => {
    const node = document.createElement(`div`);

    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }
};
