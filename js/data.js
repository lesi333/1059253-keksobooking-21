"use strict";

(() => {
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

  const getRandomMinMaxElement = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.createMapContent = () => {
    const mapsContent = [];

    for (let i = 1; i < 9; i++) {
      const locations = {
        x: getRandomMinMaxElement(150, 700),
        y: getRandomMinMaxElement(130, 630)
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
})();
