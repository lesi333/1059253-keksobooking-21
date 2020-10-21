'use strict';

(() => {
  const filterForm = document.querySelector(`.map__filters`);
  const housingTypeFilterElement = filterForm.querySelector(`#housing-type`);
  const housingPriceFilterElement = filterForm.querySelector(`#housing-price`);
  const housingRoomsFilterElement = filterForm.querySelector(`#housing-rooms`);
  const housingGuestsFilterElement = filterForm.querySelector(`#housing-guests`);
  const filterFormFeaturesElement = filterForm.querySelector(`.map__features`);

  const MAX_PIN_ON_MAP = 5;
  const HIGH_PRICE = 50000;
  const LOW_PRICE = 10000;

  const getTypeFilter = (data) => {
    return (housingTypeFilterElement.value !== `any`) ? housingTypeFilterElement.value === data.offer.type : true;
  };

  const getPriceFilter = (data) => {
    return housingPriceFilterElement.value === `any` ||
    (housingPriceFilterElement.value === `low` && data.offer.price < LOW_PRICE) ||
    (housingPriceFilterElement.value === `middle` && (data.offer.price >= LOW_PRICE && data.offer.price <= HIGH_PRICE)) ||
    (housingPriceFilterElement.value === `high` && data.offer.price > HIGH_PRICE);
  };

  const getRoomsFilter = (data) => {
    return housingRoomsFilterElement.value !== `any` ? +housingRoomsFilterElement.value === data.offer.rooms : true;
  };

  const getGuestsFilter = (data) => {
    return housingGuestsFilterElement.value !== `any` ? +housingGuestsFilterElement.value === data.offer.guests : true;
  };

  const getFeaturesFilter = (data) => {
    const checkedFilterFeatures = filterFormFeaturesElement.querySelectorAll(`.map__checkbox:checked`);

    if (checkedFilterFeatures.length === 0) {
      return true;
    }

    let isFeature = true;

    checkedFilterFeatures.forEach((checkedFeature) => {
      if (!data.offer.features.includes(checkedFeature.value)) {
        isFeature = false;
      }
    });

    return isFeature;
  };

  const applyAll = (data) => {
    return data.filter((item) => {
      return getTypeFilter(item) &&
      getPriceFilter(item) &&
      getRoomsFilter(item) &&
      getGuestsFilter(item) &&
      getFeaturesFilter(item);
    }).slice(0, MAX_PIN_ON_MAP);
  };

  const onDataLoadSuccess = (data) => {
    window.DATA = data;
    window.renderPins(applyAll(window.DATA));
  };

  const onUpdatePinOnFilters = () => {
    window.deletePins();
    window.map.closeCard();
    window.renderPins(applyAll(window.DATA));
  };

  const onTypeFilterChange = window.debounce(onUpdatePinOnFilters);
  const onPriceFilterChange = window.debounce(onUpdatePinOnFilters);
  const onRoomsFilterChange = window.debounce(onUpdatePinOnFilters);
  const onGuestsFilterChange = window.debounce(onUpdatePinOnFilters);
  const onFeatureFilterClick = window.debounce(onUpdatePinOnFilters);

  window.filter = {
    onDataLoadSuccess,
    housingTypeFilterElement,
    housingPriceFilterElement,
    housingRoomsFilterElement,
    housingGuestsFilterElement,
    onTypeFilterChange,
    onPriceFilterChange,
    onRoomsFilterChange,
    onGuestsFilterChange,
    onFeatureFilterClick
  };
})();
