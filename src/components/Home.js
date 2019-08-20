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

class Home extends React.Component {
  componentDidMount() {
    // fetch data every 5 mins
    this.fetchWetherData();
    this.intervalID = setInterval(this.fetchWetherData.bind(this), 50000);
  }

  componentWillUnmount() {
    // clear interval setting
    clearInterval(this.intervalID);
  }

  fetchWetherData = () => {
    //fetch data based on current geo location
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      const param = `lat=${latitude}&lon=${longitude}`;
      await this.props.getCurrentWeather(param);
      await this.props.getForecastWeather(param);
    });
  };

  render() {
    if (!this.props.currentWeather) return <div />;

    return (
      <CurrentWeatherStore
        currentCode={this.props.currentWeather.weather[0].id}
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
