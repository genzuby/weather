import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { TweenMax, Power3 } from "gsap";
import { WeatherContext } from "../../context/CurrentInfoContext";
import { getCurrentTime } from "./commonFunc.js";

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
  h3 {
    margin: 0.5rem auto;
  }
  h1 {
    font-size: 3.8rem;
  }

  h2 {
    font-size: 2rem;
  }

  i {
    margin: 0.5em auto;
    font-size: 2.5rem;
  }
  h3 {
    font-size: 1.5rem;
  }
`;

export default connect(mapStateToProps)(CurrentInfo);
