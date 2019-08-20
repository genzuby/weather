import React from "react";
import { TweenMax, Power1 } from "gsap";
import styled from "styled-components";
import { randomInRange } from "../commonFunc";

class RainDrops extends React.Component {
  constructor(props) {
    super(props);

    this.rains = [];
  }

  componentDidMount() {
    this.rains.forEach(rain => {
      const pos = randomInRange(101.1, 0);
      const delay = this.props.snow ? randomInRange(10, 0) : Math.random();
      const speed = this.props.snow
        ? randomInRange(17, 9)
        : randomInRange(2, 1);
      const rotate = this.props.snow ? randomInRange(200, 90) : 0;
      const blurVal = this.props.snow
        ? randomInRange(3, 1)
        : randomInRange(2, 0);
      const path = () => {
        const min = -150,
          max = 150;
        return [
          { x: randomInRange(max, min), y: randomInRange(max, min) },
          { x: randomInRange(max, min), y: randomInRange(max, min) },
          { x: randomInRange(max, min), y: randomInRange(max, min) },
          { x: randomInRange(max, min), y: randomInRange(max, min) }
        ];
      };
      const bezierValue = this.props.snow ? path() : [];

      TweenMax.set(rain, { left: pos + "%" });
      TweenMax.to(rain, speed, {
        y: 1520,
        filter: `blur(${blurVal}px)`,
        delay: delay,
        repeat: -1,
        rotation: rotate,
        transformOrigin: "left top",
        bezier: {
          type: "soft",
          values: bezierValue,
          autoRotate: true
        },
        ease: Power1.easeInOut
      });
    });
  }

  makeRain = () => {
    const itemcount = parseInt(this.props.itemCnt);
    const arry = new Array(itemcount).fill();

    const rains = arry.map((s, i) => {
      const height = this.props.snow
        ? randomInRange(15, 7)
        : randomInRange(22, 12);

      const alpha = this.props.snow
        ? randomInRange(0.9, 0.4)
        : randomInRange(1, 0.5);

      const rainPath = {
        viewbox: "0 0 5 50",
        d:
          "M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"
      };
      const snowPath = {
        viewbox: "0 0 448 512",
        d:
          "M440.1 355.2l-39.2-23 34.1-9.3c8.4-2.3 13.4-11.1 11.1-19.6l-4.1-15.5c-2.2-8.5-10.9-13.6-19.3-11.3L343 298.2 271.2 256l71.9-42.2 79.7 21.7c8.4 2.3 17-2.8 19.3-11.3l4.1-15.5c2.2-8.5-2.7-17.3-11.1-19.6l-34.1-9.3 39.2-23c7.5-4.4 10.1-14.2 5.8-21.9l-7.9-13.9c-4.3-7.7-14-10.3-21.5-5.9l-39.2 23 9.1-34.7c2.2-8.5-2.7-17.3-11.1-19.6l-15.2-4.1c-8.4-2.3-17 2.8-19.3 11.3l-21.3 81-71.9 42.2v-84.5L306 70.4c6.1-6.2 6.1-16.4 0-22.6l-11.1-11.3c-6.1-6.2-16.1-6.2-22.2 0l-24.9 25.4V16c0-8.8-7-16-15.7-16h-15.7c-8.7 0-15.7 7.2-15.7 16v46.1l-24.9-25.4c-6.1-6.2-16.1-6.2-22.2 0L142.1 48c-6.1 6.2-6.1 16.4 0 22.6l58.3 59.3v84.5l-71.9-42.2-21.3-81c-2.2-8.5-10.9-13.6-19.3-11.3L72.7 84c-8.4 2.3-13.4 11.1-11.1 19.6l9.1 34.7-39.2-23c-7.5-4.4-17.1-1.8-21.5 5.9l-7.9 13.9c-4.3 7.7-1.8 17.4 5.8 21.9l39.2 23-34.1 9.1c-8.4 2.3-13.4 11.1-11.1 19.6L6 224.2c2.2 8.5 10.9 13.6 19.3 11.3l79.7-21.7 71.9 42.2-71.9 42.2-79.7-21.7c-8.4-2.3-17 2.8-19.3 11.3l-4.1 15.5c-2.2 8.5 2.7 17.3 11.1 19.6l34.1 9.3-39.2 23c-7.5 4.4-10.1 14.2-5.8 21.9L10 391c4.3 7.7 14 10.3 21.5 5.9l39.2-23-9.1 34.7c-2.2 8.5 2.7 17.3 11.1 19.6l15.2 4.1c8.4 2.3 17-2.8 19.3-11.3l21.3-81 71.9-42.2v84.5l-58.3 59.3c-6.1 6.2-6.1 16.4 0 22.6l11.1 11.3c6.1 6.2 16.1 6.2 22.2 0l24.9-25.4V496c0 8.8 7 16 15.7 16h15.7c8.7 0 15.7-7.2 15.7-16v-46.1l24.9 25.4c6.1 6.2 16.1 6.2 22.2 0l11.1-11.3c6.1-6.2 6.1-16.4 0-22.6l-58.3-59.3v-84.5l71.9 42.2 21.3 81c2.2 8.5 10.9 13.6 19.3 11.3L375 428c8.4-2.3 13.4-11.1 11.1-19.6l-9.1-34.7 39.2 23c7.5 4.4 17.1 1.8 21.5-5.9l7.9-13.9c4.6-7.5 2.1-17.3-5.5-21.7z"
      };

      return (
        <div key={i} ref={el => (this.rains[i] = el)} className="droplet">
          <svg
            preserveAspectRatio="xMinYMin"
            viewBox={this.props.snow ? snowPath.viewbox : rainPath.viewBox}
            style={{ height: height }}
          >
            <path
              style={{ opacity: alpha }}
              fill="#fff"
              strock="none"
              d={this.props.snow ? snowPath.d : rainPath.d}
            />
          </svg>
        </div>
      );
    });

    return rains;
  };

  render() {
    const angle = parseInt(this.props.angle);

    return <WEATHERCONTAINER angle={angle}>{this.makeRain()}</WEATHERCONTAINER>;
  }
}

const WEATHERCONTAINER = styled.div`
  position: absolute;
  top: 0;
  left: -10%;
  right: 0;
  width: 110vw;
  height: 110vh;
  z-index: 1;
  transform: rotate(-${props => (props.angle ? props.angle : 0)}deg);

  .droplet {
    position: absolute;
    rotate: 0;
    top: -20%;
  }
`;

export default RainDrops;
