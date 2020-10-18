'use strict';

(() => {
  const mapFilterForm = document.querySelector(`.map__filters`);
  const housingTypeFilterElement = mapFilterForm.querySelector(`#housing-type`);

  const onTypeFilterChange = () => {
    const typeFiltered = window.save.response.filter((pin) => {
      // console.log(pin);
      if (housingTypeFilterElement.value !== `any`) {
        return housingTypeFilterElement.value === pin.offer.type;
      } else {
        return true;
      }
    });
    // console.log(window.save.response);
    window.deletePins();
    // console.log(window.save.response);
    window.onRenderPinsLoadSuccess(typeFiltered);
  };
  const onSuccessGetResponse = (data) => {
    window.save.response = data;
    // console.log(window.save.response);
  };

  window.load(onSuccessGetResponse, window.util.onShowError);

  window.filter = {
    onTypeFilterChange,
    housingTypeFilterElement
  };
})();
