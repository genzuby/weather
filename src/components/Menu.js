import React, { useState, useRef, useContext } from "react";
import TweenMax from "gsap";
import styled from "styled-components";
import SearchInput from "./SearchInput";
import { CityContext } from "../context/SelectedCityContext";

const Menu = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const contextInfo = useContext(CityContext);

  let searchRef = useRef(null);
  let searchBgRef = useRef(null);
  let currentRef = useRef(null);
  let currentBgRef = useRef(null);
  let inputRef = useRef(null);

  const toggleMenu = e => {
    // to reuse funcion and multiple click prevent
    if (e === undefined || e.detail === 1) {
      const move1 = displayMenu ? 48 : 57;
      const move2 = displayMenu ? 48 : 97;
      const delay = displayMenu ? [0.4, 0.3, 0.1, 0] : [0, 0.1, 0.3, 0.4];

      // menu close open
      displayMenu ? setDisplayMenu(false) : setDisplayMenu(true);
      if (displaySearch) setDisplaySearch(false);

      TweenMax.to(searchRef, 0.35, {
        delay: delay[0],
        left: move2,
        top: move1
      });
      TweenMax.to(searchBgRef, 0.3, {
        delay: delay[1],
        left: move2,
        top: move1
      });
      TweenMax.to(currentRef, 0.35, {
        delay: delay[2],
        left: move1,
        top: move2
      });
      TweenMax.to(currentBgRef, 0.3, {
        delay: delay[3],
        left: move1,
        top: move2
      });
    }
  };

  const showSearchInput = () => {
    const inputWidth = displaySearch ? 0 : 320;

    displaySearch ? setDisplaySearch(false) : setDisplaySearch(true);

    TweenMax.to(inputRef, 0.3, {
      width: inputWidth,
      opacity: 1
    });
    TweenMax.to(searchRef, 0.3, {
      left: `+=${displaySearch ? -270 : 270}`
    });
    TweenMax.to(searchBgRef, 0.3, {
      left: `+=${displaySearch ? -270 : 270}`
    });
  };

  const renderCurrentLocationWeather = () => {
    contextInfo.onCityChange();
    if (displaySearch) {
      TweenMax.to(inputRef, 0.3, {
        width: 0
      });
      TweenMax.to(searchRef, 0.3, {
        left: "-=270"
      });
      TweenMax.to(searchBgRef, 0.3, {
        left: "-=270"
      });
    }
    renderCloseAll();
  };

  const renderCloseAll = () => {
    // when search data, close menu icons
    setDisplayMenu(false);
    setDisplaySearch(false);
    toggleMenu();
  };

  return (
    <MENU>
      <SEARCH ref={el => (inputRef = el)}>
        {displaySearch ? (
          <SearchInput handler={renderCloseAll}></SearchInput>
        ) : (
          ""
        )}
      </SEARCH>
      <MENUBG
        ref={el => (searchBgRef = el)}
        style={{ background: "#7261A3" }}
      ></MENUBG>
      <MENUBG
        ref={el => (searchRef = el)}
        onClick={showSearchInput}
        main={displayMenu ? "first" : "back"}
        style={{ background: "#7261A3" }}
        title={displaySearch ? "Close Search Input" : "Open Search"}
      >
        <MENUICON
          src={
            displaySearch
              ? "/images/icons/times-solid.svg"
              : "/images/icons/search-solid.svg"
          }
          alt="Search"
        />
      </MENUBG>
      <MENUBG
        ref={el => (currentBgRef = el)}
        style={{ background: "#75DDDD" }}
      ></MENUBG>
      <MENUBG
        ref={el => (currentRef = el)}
        style={{ background: "#75DDDD" }}
        main={displayMenu ? "second" : "back"}
        onClick={renderCurrentLocationWeather}
        title="Weather of your Location"
      >
        <MENUICON
          src="/images/icons/location-arrow-solid.svg"
          alt="Go to Current Location"
        />
      </MENUBG>
      <MENUBG
        main={displayMenu ? "sub" : "main"}
        style={{ background: "#ED4D6E" }}
        onClick={toggleMenu}
        // onDoubleClick={toggleMenu}
        title={displayMenu ? "Close Menu" : "Open Menu"}
      >
        <MENUICON src="/images/icons/times-solid.svg" alt="menu" />
      </MENUBG>
    </MENU>
  );
};

const MENU = styled.div`
  position: absolute;
  z-index: 9;
  top: -2.4em;
  left: -2.4em;
`;

const SEARCH = styled.div`
  position: absolute;
  top: 1.7em;
  left: 4.5em;
  width: 0;
  opacity: 0;
`;

const MENUBG = styled.div`
  position: absolute;
  top: 3em;
  left: 3em;
  width: 2.7em;
  height: 2.7em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  transform: ${props => {
    if (props.main === "main") return `rotate(45deg)`;
    else if (props.main === "sub") return `rotate(180deg)`;
  }};
  transition: transform 0.3s ease-in-out;
`;

const MENUICON = styled.img`
  height: 1.2em;
  width: 1.2em;
  cursor: pointer;
`;
export default Menu;
