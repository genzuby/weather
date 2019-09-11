import React from "react";
import styled from "styled-components";
// auto complete for city list
import cityGeoDBApi from "../api/cityGeoDBApi";
//import for using context information
import { CityContext } from "../context/SelectedCityContext";

class SearchInput extends React.Component {
  static contextType = CityContext;

  state = {
    citylist: []
  };

  refList = [];

  handleChange = async e => {
    // input change event handler
    const param = e.target.value;
    const response = await cityGeoDBApi.get(`latlon.php?location=${param}`);
    this.setState({ citylist: response.data.Results });
  };

  renderCityList = () => {
    const cities = this.state.citylist;
    if (cities.length === 0) return;

    // render city list
    return cities.map((city, i) => {
      if (city.tz === "MISSING") return "";
      return (
        <li
          key={i}
          ref={el => (this.refList[i] = el)}
          tabIndex="0"
          onClick={() =>
            this.onClickCity({
              lat: city.lat,
              lon: city.lon,
              timezone: city.tz,
              city: city.name
            })
          }
          onKeyDown={e =>
            this.onKeyDownList(
              {
                lat: city.lat,
                lon: city.lon,
                timezone: city.tz,
                city: city.name
              },
              e
            )
          }
        >
          {city.name}
        </li>
      );
    });
  };

  onClickCity = cityInfo => {
    // set context value
    this.context.onCityChange(cityInfo);
    // input text value change to select city Fullname
    this.refInput.value = cityInfo.city;
    // close list
    this.setState({ citylist: [] });
  };

  onKeyDownList = (cityInfo, e) => {
    if (e.keyCode === 13) {
      // set context value
      this.context.onCityChange(cityInfo);
      // input text value change to select city Fullname
      this.refInput.value = cityInfo.city;
      // close list
      this.setState({ citylist: [] });
    }
  };

  handleKeyDownInput = e => {
    if (e.keyCode === 27) {
      // ESC keydown event : clear list
      e.target.value = "";
      this.setState({ citylist: [] });
    } else if (e.keyCode === 40) {
      // keydown down arrow
      this.refList[0].focus();
    }
  };

  render() {
    return (
      <SEARCHDIV>
        <INPUTFIELD
          type="text"
          placeholder="Input city name"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDownInput}
          ref={el => (this.refInput = el)}
        />
        <CITYLIST>{this.renderCityList()}</CITYLIST>
      </SEARCHDIV>
    );
  }
}

const SEARCHDIV = styled.div`
  position: relative;
  margin: 2em;
  width: inherite;
`;

const INPUTFIELD = styled.input`
  width: 100%;
  padding: 0.5em;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 3px;
  outline: none;

  &:focus {
    border: 2px solid #7261a3;
  }
`;

const CITYLIST = styled.ul`
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 1.62em;
  width: 100%;
  padding: 0;
  max-height: 55vh;
  overflow: auto;

  li {
    padding: 0.8em 2em;
    font-size: 0.9rem;
    border: 1px solid rgba(0, 0, 0, 0.9);
    color: #969696;
    cursor: pointer;
    transition: all 0.15s ease-out;

    &:hover,
    &:focus {
      color: #fff;
      background: rgba(255, 255, 255, 0.5);
      outline: none;
    }
  }
`;

export default SearchInput;
