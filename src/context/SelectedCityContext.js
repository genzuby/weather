import React from "react";
import {
  checkDayNight,
  checkDayNightbyTimeZone
} from "../components/items/commonFunc";

export const CityContext = React.createContext();

export class CityContextStore extends React.Component {
  constructor() {
    super();

    this.state = {
      lat: null,
      lon: null,
      timezone: null,
      city: null,
      tzDay: checkDayNight()
    };

    this.currentLocation();
  }

  currentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      this.setState({
        lat: latitude,
        lon: longitude
      });
    });
  };

  onCityChange = cityInfo => {
    if (cityInfo === undefined) {
      // weather of current location
      this.currentLocation();
      this.setState({ timezone: null, city: null });
      return;
    }
    const { lat, lon, timezone, city } = cityInfo;

    // Day(true) or Night(false)
    const tzDay =
      checkDayNightbyTimeZone(timezone) === null
        ? checkDayNight()
        : checkDayNightbyTimeZone(timezone);

    this.setState({ lat, lon, timezone, city, tzDay });
  };

  render() {
    return (
      <CityContext.Provider
        value={{ ...this.state, onCityChange: this.onCityChange }}
      >
        {this.props.children}
      </CityContext.Provider>
    );
  }
}
