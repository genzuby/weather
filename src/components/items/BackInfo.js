import React, { useRef, useContext, useEffect } from "react";
import TweenMax, { Power3 } from "gsap/src/uncompressed/TweenMax";
import styled from "styled-components";
import { WeatherContext } from "../../context/CurrentInfoContext";

const BackInfo = () => {
  let bgRef = useRef(null);
  const assets = useContext(WeatherContext);

  const onMouseMoveHandler = e => {
    const xPos = e.clientX / window.innerWidth - 0.1;
    const yPos = e.clientY / window.innerHeight - 0.1;

    TweenMax.to(bgRef, 0.8, {
      ease: Power3.easeOut,
      rotationX: 4 * xPos,
      rotationY: 4 * yPos,
      transformOrigin: "center",
      transformPerspective: 1000
    });
  };

  useEffect(() => {
    TweenMax.to(bgRef, 1, {
      opacity: 1,
      ease: Power3.easeOut
    });
  }, []);

  // useEffect(() => {
  //   window.addEventListener("mousemove", onMouseMoveHandler);

  //   return () => {
  //     document.removeEventListener("mousemove", onMouseMoveHandler);
  //   };
  // }, []);

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
