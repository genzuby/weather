import React, { useRef, useEffect } from "react";
import { TimelineMax, Power3 } from "gsap";
import styled from "styled-components";
import { checkDayNight } from "../commonFunc";

const Thunderstorms = () => {
  let refThunder1 = useRef(null);
  let refThunder2 = useRef(null);
  let refBG = useRef(null);
  const thunderImg = ["thunder-ani1.jpg", "thunder-ani2.jpg"];

  const showThunder = objName => {
    const tl = new TimelineMax();
    tl.set(objName, { opacity: 0.4 });
    tl.to(objName, 1.8, { opacity: 0 });

    return tl;
  };

  const flashLight = () => {
    const tl = new TimelineMax();
    tl.fromTo(refBG, 0.3, { opacity: 0 }, { opacity: 0.6 })
      .fromTo(refBG, 0.3, { opacity: 0.2 }, { opacity: 0.8 })
      .to(refBG, 0.2, { opacity: 0, ease: Power3.easeInOut });

    return tl;
  };

  useEffect(() => {
    const allTl = new TimelineMax({ repeat: -1, repeatDelay: 5 });

    allTl
      .add(showThunder(refThunder1))
      .add(flashLight())
      .add(showThunder(refThunder2), "+=6")
      .add(flashLight());

      return ()=>{
        allTl.kill()
      }

  });

  const thunderBg = thunderImg.map((thunder, i) => {
    return (
      <THUNDER
        key={i}
        ref={el => (i === 0 ? (refThunder1 = el) : (refThunder2 = el))}
        imgUrl={`/images/${thunder}`}
      />
    );
  });

  const bgImg = checkDayNight()
    ? "/images/thunder-day.jpg"
    : "/images/thunder-night.jpg";
  return (
    <React.Fragment>
      <THUNDERBG bgImg={bgImg} ref={el => (refBG = el)} />
      {thunderBg}
    </React.Fragment>
  );
};

const THUNDERBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${props => props.bgImg});
  background-size: cover;
  background-attachment: fixed;
  filter: brightness(3);
  opacity: 0;
  height: 100%;
  width: 100%;
`;

const THUNDER = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${props => props.imgUrl});
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  opacity: 0;
`;
export default Thunderstorms;
