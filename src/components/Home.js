import React from "react";
import { connect } from "react-redux";
import { getCurrentWeather, getForecastWeather } from "../action";
import styled from "styled-components";
// Import Background Image object based on current weather
import BackInfo from "./items/BackInfo";
// Import current weather Info
import CurrentInfo from "./items/CurrentInfo";
// Import forcast weather Info(for 5 days)
import ForecastDays from "./items/ForecastDays";
// Import animation effects object based on current weather
import WeatherAnimation from "./items/WeatherAnimation";
// json asset data context based on current weather
import { CurrentWeatherStore } from "../context/CurrentInfoContext";
// selected city information
import { CityContext } from "../context/SelectedCityContext";
import { checkDayNight } from "./items/commonFunc";

class Home extends React.Component {
  static contextType = CityContext;

  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lon: null,
      day: null,
      tz: null,
      city: null
    };

    this.currentLocation();
  }

  componentDidMount() {
    // fetch data every 5 mins
    this.fetchWetherData();
    this.intervalID = setInterval(this.fetchWetherData.bind(this), 100000);
  }

  componentDidUpdate(preProps, preState) {
    //for context value change
    if (
      preState.lat !== this.context.lat &&
      preState.lon !== this.context.lon
    ) {
      this.setState({
        lat: this.context.lat,
        lon: this.context.lon,
        day: this.context.tzDay,
        tz: this.context.timezone,
        city: this.context.city
      });
      this.fetchWetherData();
    }
  }

  componentWillUnmount() {
    // clear interval setting
    clearInterval(this.intervalID);
  }

  fetchWetherData = async () => {
    //fetch data
    if (this.state.lat === null || this.state.lon === null) {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        let param = `lat=${latitude}&lon=${longitude}`;
        await this.props.getCurrentWeather(param);
        await this.props.getForecastWeather(param);
      });
    } else {
      let param = `lat=${this.state.lat}&lon=${this.state.lon}`;
      await this.props.getCurrentWeather(param);
      await this.props.getForecastWeather(param);
    }
  };

  currentLocation = () => {
    // default location value  : current position
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      this.setState({
        lat: latitude,
        lon: longitude,
        day: checkDayNight() // this.context.tzDay
      });
    });
  };

  render() {
    if (!this.props.currentWeather) return <div />;

    return (
      <CurrentWeatherStore
        currentCode={this.props.currentWeather.weather[0].id}
        day={this.state.day}
        timezone={this.state.tz}
        city={this.state.city}
      >
        <BackInfo />
        <MAININFO>
          <CurrentInfo />
          <ForecastDays />
        </MAININFO>
        <WeatherAnimation />
      </CurrentWeatherStore>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentWeather: state.currentWeather
  };
};

const MAININFO = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  color: #fff;
  text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

export default connect(
  mapStateToProps,
  { getCurrentWeather, getForecastWeather }
)(Home);
