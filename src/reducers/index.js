import { combineReducers } from "redux";
import fetchCurrentWeather from "./fetchCurrentWeather";
import fetchForecastWeather from "./fetchForecastWeather";

export default combineReducers({
  currentWeather: fetchCurrentWeather,
  forecast5days: fetchForecastWeather
});
