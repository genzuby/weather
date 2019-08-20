import React, { useContext } from "react";
import RainDrops from "./animations/RainDrop";
import Thunderstorms from "./animations/Thunderstorms";
import Clouds from "./animations/Clouds";
import Sunshine from "./animations/Sunshine";
import SoundEffect from "./animations/SoundEffect";
import { WeatherContext } from "../../context/CurrentInfoContext";

const WeatherAnimation = () => {
  const asset = useContext(WeatherContext);

  const setWeatherAni = () => {
    switch (asset.id) {
      case 2: {
        //thunderstorm + rain
        return (
          <React.Fragment>
            <Thunderstorms />
            <RainDrops itemCnt="250" angle="20" />
          </React.Fragment>
        );
      }
      case 3: {
        //Drizzle
        return <RainDrops itemCnt="100" />;
      }
      case 5: {
        //Rain
        return (
          <React.Fragment>
            <SoundEffect />
            <RainDrops itemCnt="200" angle="20" />
          </React.Fragment>
        );
      }
      case 6: {
        //Snow
        return <RainDrops itemCnt="70" snow />;
      }
      case 7: {
        //Mist
        return <Sunshine />;
      }
      case 800: {
        //Clear : each day & night
        return <Sunshine />;
      }
      default: {
        //Clouds
        // return <Sunshine />;
        return <Clouds />;
      }
    }
  };

  return <React.Fragment>{setWeatherAni()}</React.Fragment>;
};

export default WeatherAnimation;
