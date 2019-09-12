import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { TweenMax, Power3 } from "gsap";
import { WeatherContext } from "../../context/CurrentInfoContext";
import { getCurrentTime } from "./commonFunc.js";
import media from "../style/media";

class CurrentInfo extends React.Component {
  static contextType = WeatherContext;

  constructor(props) {
    super(props);
    // reference to the DOM node
    this.myElement = null;
  }

  state = {
    currenttime: null
  };

  componentDidMount() {
    TweenMax.to(this.myElement, 3, {
      opacity: 1,
      ease: Power3.easeOut
    });
    // time change every one sec.
    setInterval(() => {
      this.setState({ currenttime: getCurrentTime(this.context.tz) });
    }, 1000);

    return () => {
      clearInterval();
    };
  }

  render() {
    const mainInfo = this.props.currentWeather.weather[0];
    const detailInfo = this.props.currentWeather;

    return (
      <CURRENTINFO ref={el => (this.myElement = el)}>
        <h3>{this.context.city ? this.context.city : detailInfo.name}</h3>
        <h4>{this.state.currenttime}</h4>
        <h1>{mainInfo.main}</h1>
        <h3>{mainInfo.description}</h3>
        <i className={this.context.icon} />
        <h2>{Math.round(detailInfo.main.temp - 273.15)}°C</h2>
      </CURRENTINFO>
    );
  }
}

const mapStateToProps = state => {
  return { currentWeather: state.currentWeather };
};

const CURRENTINFO = styled.div`
  margin-bottom: 5%;
  opacity: 0;

  h1,
  h2,
  h3,
  h4 {
    margin: 0.5rem auto;

    ${media.pad`
      margin: 0.1rem auto;
    `}
  }
  h1 {
    font-size: calc(1.8rem + 2vw);
  }

  h2 {
    font-size: calc(0.8rem + 1vw);
  }

  i {
    margin: 0.5em auto;
    font-size: calc(1.5rem + 1vw);
  }
  h3 {
    font-size: calc(0.8rem + 0.7vw);
  }
  h4 {
    font-size: calc(0.7rem + 0.5vw);
  }
`;

export default connect(mapStateToProps)(CurrentInfo);
