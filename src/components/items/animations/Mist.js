import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { TweenMax } from "gsap/all";

const Mist = () => {
  //initial fogs
  let refFog1 = useRef(null);
  let refFog2 = useRef(null);

  useEffect(() => {
    //for moving fog
    TweenMax.set(refFog1, { left: -30 + "%" });
    TweenMax.to(refFog1, 10, {
      opacity: 1,
      left: "+=10%",
      repeat: -1,
      yoyo: true
    });
    TweenMax.to(
      refFog2,
      10,
      {
        opacity: 0.9,
        left: "-=10%",
        repeat: -1,
        yoyo: true
      },
      "+=2"
    );
  }, []);

  return (
    <React.Fragment>
      <FOG
        ref={el => (refFog1 = el)}
        style={{ background: "url(/images/fog-1.png)" }}
      />
      <FOG
        ref={el => (refFog2 = el)}
        style={{ background: "url(/images/fog-2.png)" }}
      />
    </React.Fragment>
  );
};

const FOG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 160%;
  opacity: 0.1;
  filter: blur(1px);
`;

export default Mist;
