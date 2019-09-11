import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { WeatherContext } from "../../../context/CurrentInfoContext";

const SoundEffect = () => {
  const [checked, setChecked] = useState("PLAY");
  let refAudio = useRef(null);
  const assets = useContext(WeatherContext);

  useEffect(() => {
    if (!refAudio) return;
    refAudio.src = `/sounds/${assets.sound}`;
    refAudio.volume = 0.2;
    refAudio.loop = true;
    refAudio.load();

    refAudio.oncanplaythrough = () => {
      // refAudio.play();
      // when the browser estimates it can play through the specified media without having to stop for buffering.
      console.log("oncanplaythrough");
    };
    refAudio.play();
  }, [assets.sound]);

  const onChangeRadio = checkValue => {
    if (!refAudio) return;
    setChecked(checkValue);
    checkValue === "PLAY" ? refAudio.play() : refAudio.pause();
  };

  return (
    <React.Fragment>
      <FORM>
        <input
          type="radio"
          id="sound__on"
          name="switch"
          checked={checked === "PLAY"}
          className="btn-switch__radio btn-switch__radio_yes"
          onChange={() => onChangeRadio("PLAY")}
        />
        <input
          type="radio"
          name="switch"
          id="sound__off"
          checked={checked === "PAUSE"}
          className="btn-switch__radio btn-switch__radio_no"
          onChange={() => onChangeRadio("PAUSE")}
        />
        <label
          htmlFor="sound__on"
          className="btn-switch__label btn-switch__label_yes"
        >
          <span className="btn-switch__txt">
            <i className="fas fa-volume-up" />
          </span>
        </label>
        <label
          htmlFor="sound__off"
          className="btn-switch__label btn-switch__label_no"
        >
          <span className="btn-switch__txt">
            <i className="fas fa-volume-mute" />
          </span>
        </label>
      </FORM>
      <audio ref={el => (refAudio = el)} />
    </React.Fragment>
  );
};

const FORM = styled.form`
  font-size: 1.1em;
  position: absolute;
  display: inline-block;
  user-select: none;
  top: 2em;
  right: 2em;
  z-index: 3;

  .btn-switch__radio {
    display: none;
  }

  .btn-switch__radio_no:checked ~ .btn-switch__label_yes .btn-switch__txt,
  .btn-switch__radio_yes:checked ~ .btn-switch__label_no .btn-switch__txt {
    opacity: 0;
  }

  .btn-switch__radio_yes:checked ~ .btn-switch__label:before {
    background: #ffc857;
  }

  .btn-switch__radio_yes:checked ~ .btn-switch__label_no:after {
    left: calc(100% - 1.6em);
    background: #fff;
  }

  .btn-switch__radio_no:checked ~ .btn-switch__label_yes:before,
  .btn-switch__radio_yes:checked ~ .btn-switch__label_no:before {
    z-index: 2;
  }
  .btn-switch__radio_yes:checked ~ .btn-switch__label_yes {
    color: #fff;
    padding-top: 0.28em;
    padding-left: 0.3em;
  }

  .btn-switch__label {
    display: inline-block;
    padding: 0.18em;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 1.2em;
      box-shadow: inset 0 1px 3px rgba(43, 43, 43, 0.05) 2px 2px 3px
        rgba(0, 0, 0, 0.6);
      transition: background 0.2s ease-in-out;
    }
    .btn-switch__txt {
      position: relative;
      z-index: 3;
      display: inline-block;
      width: 0.7em;
      opacity: 1;
      pointer-events: none;
      transition: opacity 0.2s ease-in-out;
      margin: 0.1em 0 0.1em 0.32em;
      color: #fff;

      i {
        font-size: 1rem;
        margin-right: 0.3em;
      }
    }
  }

  .btn-switch__label + .btn-switch__label {
    padding-right: 0.75em;
    padding-left: 0.3em;
  }

  .btn-switch__label_no:after {
    content: "";
    position: absolute;
    z-index: 3;
    top: 0.25em;
    bottom: 0.25em;
    left: 0.5em;
    right: 0.3em;
    width: 1.2em;
    height: 1.2em;
    background: #fff;
    border-radius: 50%;
    pointer-events: none;
    box-shadow: 0 0.1429em 0.2143em rgba(43, 43, 43, 0.2),
      0 0.3572em 0.3572em rgba(43, 43, 43, 0.1);
    transition: left 0.2s ease-in-out, background 0.2s ease-in-out;
  }
`;
export default SoundEffect;
