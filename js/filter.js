'use strict';

(() => {
  const mapFilterForm = document.querySelector(`.map__filters`);
  const housingTypeFilterElement = mapFilterForm.querySelector(`#housing-type`);

  const getTypeFilter = (data) => {
    return (housingTypeFilterElement.value !== `any`) ? housingTypeFilterElement.value === data.offer.type : true;
  };

  const applyAll = (data) => {
    return data.filter((item) => {
      return getTypeFilter(item);
    }).slice(0, 5);
  };

  const onDataLoadSuccess = (data) => {
    window.DATA = data;
    window.renderPins(window.DATA);
  };

  housingTypeFilterElement.addEventListener(`change`, () =>{
    window.deletePins();
    window.map.closeCard();
    window.renderPins(applyAll(window.DATA));
  });

  window.filter = {
    onDataLoadSuccess
  };
})();
