import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { TimelineMax, Power0 } from "gsap/all";

const Clouds = () => {
  let refClouds = useRef(null);

  useEffect(() => {
    const tl = new TimelineMax({ repeat: -1 });

    tl.to(refClouds, 80, {
      backgroundPosition: "3480px 0px",
      ease: Power0.easeNone
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <React.Fragment>
      <CLOUDS ref={el => (refClouds = el)} />
    </React.Fragment>
  );
};

const CLOUDS = styled.div`
  background: url(/images/cloud1.png);
  position: absolute;
  top: 0;
  left: 0;
  height: 1000px;
  width: 100%;
  opacity: 0.35;
  filter: blur(1px);
`;

export default Clouds;
