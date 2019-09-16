import { FETCH_CURR_WEATHER, FETCH_FORE_WEATHER, API_KEY } from "./constdef";
import openWeatherApi from "../api/openWeatherApi";

export const getCurrentWeather = param => async dispatch => {
  const response = await openWeatherApi.get(
    `/weather?appid=${API_KEY}&${param}`
  );

  if (response.data) {
    dispatch({
      type: FETCH_CURR_WEATHER,
      payload: response.data
    });
  } else {
    return;
  }
};

export const getForecastWeather = param => async dispatch => {
  const response = await openWeatherApi.get(
    `/forecast?appid=${API_KEY}&${param}`
  );

  if (response.data.list) {
    const result = maniForeData(response.data.list);
    dispatch({
      type: FETCH_FORE_WEATHER,
      payload: result
    });
  } else {
    return;
  }
};

const maniForeData = data => {
  return data.reduce((result, forecast) => {
    const { day, hour } = makeKey(forecast.dt_txt);
    const mainInfo = forecast.weather[0];
    const valInfom = forecast.main;
    let objForecast = {},
      objDetail = {};
    objForecast.forecast = [];

    objDetail = {
      hour: hour,
      wid: mainInfo.id,
      maxtemp: Math.round(valInfom.temp_max - 273.15),
      mintemp: Math.round(valInfom.temp_min - 273.15),
      temp: Math.round(valInfom.temp - 273.15),
      humidity: valInfom.humidity,
      weather: mainInfo.main,
      desc: mainInfo.description,
      dt_txt: forecast.dt_txt
    };

    objForecast.day = day;
    const key = objForecast["day"];

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(objDetail);
    return result;
  }, {});
};

const makeKey = dt_txt => {
  const date = new Date();
  const gap = date.getTimezoneOffset();
  const fDate = new Date(dt_txt);
  fDate.setHours(fDate.getHours() - gap / 60);
  alert("GAP: " + gap + " DBdate:" + fDate.getHours());
  // var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);

  // console.log(new Date(dt_txt + "Z").getHours());

  const localeDay = fDate.getDate();
  const localeHour = fDate.getHours();

  return { day: localeDay, hour: localeHour };
};
