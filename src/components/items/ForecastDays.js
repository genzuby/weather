import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import _ from "lodash";
import { TimelineLite } from "gsap/all";
import assetInfo from "../../json/weatherAsset.json";
import { CityContext } from "../../context/SelectedCityContext";
import media from "../style/media";

class ForeCastDays extends React.Component {
  static contextType = CityContext;
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
    // sum value each day : Beacuse the forcast data from API are applied by hourly based
    const arry = this.props.forecast5days;
    let objTemp = [];

    Object.entries(arry).forEach(([key, value], i) => {
      const min = value.reduce(function(previous, current) {
        return previous > current.mintemp ? current.mintemp : previous;
      }, 100);

      const max = value.reduce(function(previous, current) {
        return previous > current.maxtemp ? previous : current.mintemp;
      }, 0);

      // calc min temp , max temp each day
      objTemp[i] = {
        minavg: min,
        maxavg: max
      };

      // sort by id beacuse the smaller number of id, the more unique it is.
      // refer to ./json/weatherAsset.json file
      const sortVal = _.sortBy(value, ["wid"]);

      objTemp[i].weather = sortVal[0].weather;
      objTemp[i].wid = sortVal[0].wid;
      objTemp[i].desc = sortVal[0].desc;
      objTemp[i].dt_txt = sortVal[0].dt_txt;
    });

    return objTemp;
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

    // const day = this.context.tzDay;
    // const iconclass = day
    //   ? result.icon
    //   : result.iconnight === undefined
    //   ? result.icon
    //   : result.iconnight;

    // return iconclass;
    return result.icon;
  };

  renderForecast = () => {
    const sumForecast = this.getAvgTemp();
    return sumForecast.map((data, i) => {
      return (
        <FORECAST
          key={i}
          day={this.context.tzDay}
          ref={el => (this.cards[i] = el)}
        >
          <i className={this.getWeatherIcon(data.wid)} />
          <p className="for__date">{this.getFutureDay(data.dt_txt)}</p>
          <div className="detail">
            <p>{data.weather}</p>
            <p className="temp-val">
              {data.minavg}°C / {data.maxavg}°C
            </p>
          </div>
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
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3em auto 0;
  flex-direction: row;
  ${media.pad`
    flex-direction: column;
  `};
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
  background: transparent;
  background: ${props =>
    props.day ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"};
  width: 7.1em;
  height: 12em;
  text-shadow: none;

  ${media.pad`
    flex-direction : row;
    width: 14em;
    height: 3.6em;
    margin: 2px;
  `};

  * {
    margin: 0;
    padding: 0;
    ${media.pad`
      padding: .25em;
    `}
  }

  i {
    font-size: 2.5rem;
    padding-bottom: 0.5em;
    ${media.pad`
      font-size: 1.5rem;
    `}
  }

  p {
    padding: 0.25em;
    ${media.pad`
      font-size: .8rem;
    `}
  }

  .temp-val {
    font-size: 82%;
    ${media.pad`
      font-size: 70%;
    `}
  }
`;

export default connect(mapStateToProps)(ForeCastDays);
