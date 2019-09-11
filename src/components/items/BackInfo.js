import React, { useRef, useContext, useEffect } from "react";
import TweenMax, { Power3 } from "gsap/src/uncompressed/TweenMax";
import styled from "styled-components";
import { WeatherContext } from "../../context/CurrentInfoContext";

const BackInfo = () => {
  let bgRef = useRef(null);
  const assets = useContext(WeatherContext);

  useEffect(() => {
    TweenMax.to(bgRef, 1, {
      opacity: 1,
      ease: Power3.easeOut
    });
  }, []);

  const backImg = assets.background;
  return <BACKGROUND ref={el => (bgRef = el)} imgUrl={`/images/${backImg}`} />;
};

const BACKGROUND = styled.div`
  background-image: url(${props => props.imgUrl});
  background-color: rgba(0, 0, 0, 0.3);
  background-blend-mode: multiply;
  background-size: cover;
  position: relative;
  height: 110vh;
  width: 110vw;
  opacity: 0;
  margin: 0;
  position: absolute;
  top: -5%;
  left: -5%;
`;

export default BackInfo;
