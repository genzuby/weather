import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { TimelineMax, TweenMax, Elastic, Power1 } from "gsap/all";
import { randomInRange } from "../commonFunc";

const StarryNight = () => {
  // star colors
  const colors = ["#E9D985", "#3CCFF66", "#D9F7FA", "#E8E9EB", "#F4F1BB"];

  //initial stars
  const starCount = 100;
  let refStars = useRef([
    new Array(starCount).fill().map(() => React.createRef())
  ]);

  //initial shooting stars
  const shootingStarCount = 3;
  let refShootingStars = useRef([
    new Array(shootingStarCount).fill().map(() => React.createRef())
  ]);

  // componenetDidMount
  useEffect(() => {
    // Set animation initial value of stars
    refStars.current.forEach(star => {
      const size = randomInRange(3, 2);
      const top = randomInRange(50, 0);
      const left = randomInRange(106, 0);
      const opacity = randomInRange(0.7, 0.4);

      TweenMax.set(star, {
        height: size,
        width: size,
        top: top + "%",
        left: left + "%",
        background: colors[randomInRange(4, 0)],
        filter: "blur(2px) brightness(1)",
        opacity
      });
    });

    // Set animation initial value of shooting stars
    refShootingStars.current.forEach(shootingstar => {
      const left = randomInRange(100, 30);

      TweenMax.set(shootingstar, {
        top: -10,
        left: left + "%",
        rotation: -50,
        backgroundImage: "linear-gradient(to right,#fff,transparent)",
        filter: "blur(1px) brightness(2)"
      });
    });

    // to rotate sky
    TweenMax.to(refStars.current, 90, { left: "-=6%", repeat: -1 });

    // set animation in time lines for stars
    const tlStar = new TimelineMax({ repeat: -1, yoyo: true });
    // set animation in time lines for shooting stars
    const tlShootingStar = new TimelineMax({ repeat: -1 });

    // stars animation
    tlStar.staggerTo(
      refStars.current,
      1,
      {
        transform: "scale(1.3)",
        opacity: 1,
        filter: "blur(1px) brightness(2.5)",
        ease: Elastic.easeInOut
      },
      0.1
    );

    // shooting stars animation
    // random gaps for animation
    tlShootingStar.staggerTo(
      refShootingStars.current,
      1,
      {
        top: 60 + "%",
        left: "-=30%",
        opacity: 0,
        filter: "blur(3px)",
        ease: Power1.easeIn
      },
      randomInRange(15, 8)
    );

    return () => {
      // destroy animations
      tlStar.kill();
      tlShootingStar.kill();
    };
  }, [colors]);

  // maeke star objects
  const renderStars = () => {
    const arry = new Array(starCount).fill();

    return arry.map((el, i) => {
      return <STAR key={i} ref={el => (refStars.current[i] = el)} />;
    });
  };

  // maeke shooting star objects
  const renderShootingStars = () => {
    const arry = new Array(shootingStarCount).fill();

    return arry.map((el, i) => {
      return (
        <SHOOTINGSTAR key={i} ref={el => (refShootingStars.current[i] = el)} />
      );
    });
  };

  return (
    <div>
      {renderShootingStars()}
      {renderStars()}
    </div>
  );
};

const STAR = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
`;

const SHOOTINGSTAR = styled.div`
  position: absolute;
  border-radius: 20% 0 0 20%;
  height: 6px;
  width: 180px;
  transform-origin: left bottom;
  opacity: 1;
`;

export default StarryNight;
