import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import _ from "lodash";
import { TimelineLite } from "gsap/all";
import assetInfo from "../../json/weatherAsset.json";

class ForeCastDays extends React.Component {
  constructor(props) {
    super(props);

    this.cards = [];
    this.tl = new TimelineLite();
  }

  componentDidUpdate() {
    this.tl.staggerTo(this.cards, 0.5, { opacity: 1 }, 0.1);
  }

  getFutureDay = dt_txt => {
    const date = new Date();
    const gap = date.getTimezoneOffset();
    const fDate = new Date(dt_txt);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    fDate.setHours(fDate.getHours() - gap / 60);

    const localeDay = fDate.getDate();
    const localeMonth = fDate.getMonth();

    return localeDay + " " + monthNames[localeMonth];
  };

  getAvgTemp = () => {
    const arry = this.props.forecast5days;
    let objTemp = [];

    Object.entries(arry).forEach(([key, value], i) => {
      const min = value.reduce(function(previous, current) {
        return previous > current.mintemp ? current.mintemp : previous;
      }, 100);

      const max = value.reduce(function(previous, current) {
        return previous > current.maxtemp ? previous : current.mintemp;
      }, 0);

      objTemp[i] = {
        minavg: min,
        maxavg: max
      };
      const sortVal = _.sortBy(value, ["wid"]);

      objTemp[i].weather = sortVal[0].weather;
      objTemp[i].wid = sortVal[0].wid;
      objTemp[i].desc = sortVal[0].desc;
      objTemp[i].dt_txt = sortVal[0].dt_txt;
    });

    return objTemp;
  };

  getCurrentTime = () => {
    const date = new Date();
    const hour = date.getHours();
    return hour >= 7 && hour < 20 ? true : false;
  };

  getWeatherIcon = wid => {
    let result = {};

    if (wid === 800 || wid === 801) {
      result = assetInfo.data.find(function(datum) {
        return datum.id === wid;
      });
    } else {
      result = assetInfo.data.find(function(datum) {
        return parseInt(wid / 100) === datum.id;
      });
    }

    const day = this.getCurrentTime();
    const iconclass = day
      ? result.icon
      : result.iconnight === undefined
      ? result.icon
      : result.iconnight;

    return iconclass;
  };

  renderForecast = () => {
    const sumForecast = this.getAvgTemp();
    return sumForecast.map((data, i) => {
      return (
        <FORECAST
          key={i}
          day={this.getCurrentTime()}
          ref={el => (this.cards[i] = el)}
        >
          <i className={this.getWeatherIcon(data.wid)} />
          <p>{this.getFutureDay(data.dt_txt)}</p>
          <p>{data.weather}</p>
          <p className="temp-val">
            {data.minavg}°C / {data.maxavg}°C
          </p>
        </FORECAST>
      );
    });
  };

  render() {
    return <FORECASTLIST>{this.renderForecast()}</FORECASTLIST>;
  }
}

const mapStateToProps = state => {
  return {
    forecast5days: state.forecast5days
  };
};

const FORECASTLIST = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3em auto 0;
`;

const FORECAST = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  margin: 0.5em;
  opacity: 0;

  ${props => (props.day ? "border: 1px solid #fff" : null)};
  color: #fff;
  background: ${props =>
    props.day ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"};
  width: 7.1em;
  height: 12em;
  text-shadow: none;

  * {
    margin: 0;
    padding: 0;
  }

  i {
    font-size: 2.5rem;
    padding-bottom: 0.5em;
  }

  p {
    padding: 0.25em;
  }

  .temp-val {
    font-size: 82%;
  }
`;

export default connect(mapStateToProps)(ForeCastDays);
