import React from "react";
import { checkDayNight } from "../components/items/commonFunc";
import assetInfo from "../json/weatherAsset.json";

export const WeatherContext = React.createContext();

export const CurrentWeatherStore = props => {
  const getAssetData = () => {
    let getVal = {};
    const currentCode = props.currentCode;

    if (currentCode === 800 || currentCode === 801) {
      getVal = assetInfo.data.find(function(datum) {
        return datum.id === currentCode;
      });
    } else {
      getVal = assetInfo.data.find(function(datum) {
        return parseInt(currentCode / 100) === datum.id;
      });
    }

    const day = checkDayNight();

    return {
      id: getVal.id,
      name: getVal.name,
      icon: day ? getVal.icon : getVal.iconnight,
      background: day ? getVal.background : getVal.backgroundnight,
      sound: getVal.sound
    };
  };

  const assets = getAssetData();

  return (
    <WeatherContext.Provider value={assets}>
      {props.children}
    </WeatherContext.Provider>
  );
};
