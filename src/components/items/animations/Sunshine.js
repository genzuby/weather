import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { TimelineMax, TweenMax, Elastic, Power0 } from "gsap/all";
import { randomInRange } from "../commonFunc";

const Sunshine = () => {
  // initialize reference
  let refSun = useRef(null);
  let refRing = useRef(null);
  let refRays = useRef([new Array(6).fill().map(() => React.createRef())]);
  let refParticles = useRef([
    new Array(10).fill().map(() => React.createRef())
  ]);

  useEffect(() => {
    const tl = new TimelineMax({
      repeat: -1,
      yoyo: true
    });

    tl.from(refSun, 0.001, { opacity: 0.9 }).to(refSun, 5, {
      rotation: 90,
      ease: Power0.easeOut
    });

    TweenMax.to(refRing, 8, {
      repeat: -1,
      yoyo: true,
      ease: Elastic.easeInOut,
      transform: "scale(1.7)",
      opacity: 0.5
    });

    const tlRay = new TimelineMax({ repeat: -1, yoyo: true });
    const tlPar = new TimelineMax({ repeat: -1, yoyo: true });

    refRays.current.map((ref, i) => {
      const rotate = 60;
      return TweenMax.set(ref, {
        rotation: rotate * i
      });
    });

    tlRay.staggerTo(refRays.current, 2, { opacity: 1 }, 1);

    refParticles.current.forEach(particle => {
      const size = randomInRange(8, 2);
      const top = randomInRange(65, 0);
      const left = randomInRange(95, 70);

      TweenMax.set(particle, {
        height: size,
        width: size,
        top: top + "%",
        left: left + "%"
      });
    });

    tlPar.staggerTo(
      refParticles.current,
      3,
      {
        transform: "scale(1.8)",
        opacity: 1,
        ease: Elastic.easeInOut
      },
      0.5
    );

    return () => {
      tl.kill();
      tlRay.kill();
    };
  }, []);

  // maeke sun ray objects
  const renderSunRays = () => {
    const raylength = 6;
    const arry = new Array(raylength).fill();

    return arry.map((el, i) => {
      return <RAY key={i} ref={el => (refRays.current[i] = el)} />;
    });
  };

  // maeke sun particle objects
  const renderParticles = () => {
    const particleCnt = 10;
    const arry = new Array(particleCnt).fill();

    return arry.map((el, i) => {
      return <PARTICLE key={i} ref={el => (refParticles.current[i] = el)} />;
    });
  };

  return (
    <React.Fragment>
      {renderParticles()}
      <SUNBG>
        <SUN ref={el => (refSun = el)}>
          <SUNRING ref={el => (refRing = el)} />
          {renderSunRays()}
        </SUN>
      </SUNBG>
    </React.Fragment>
  );
};

const PARTICLE = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(1px) brightness(1.5);
  border: 1px solid #fff;
  opacity: 0;
`;

const SUNBG = styled.div`
  filter: blur(3px) brightness(2);
  position: absolute;
  top: 8%;
  right: 17%;
`;

const SUNRING = styled.div`
  position: absolute;
  top: -2.5em;
  left: -80%;
  width: 8em;
  height: 8em;
  border-radius: 50%;
  filter: blur(1px) brightness(1);
  border: 1px solid #fff;
`;

const RAY = styled.div`
  position: absolute;
  width: 5px;
  height: 12em;
  top: -10em;
  left: 50%;
  filter: blur(2px) brightness(1);
  transform-origin: left bottom;
  opacity: 0;
  background-image: linear-gradient(to bottom, transparent, #fdfde1);
`;

const SUN = styled.div`
  background: #fff;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  box-shadow: 0px 0px 50px 20px rgba(255, 255, 255, 0.8);
  position: relative;
`;

export default Sunshine;
