import React, { useContext } from "react";
import RainDrops from "./animations/RainDrop";
import Thunderstorms from "./animations/Thunderstorms";
import Clouds from "./animations/Clouds";
import Sunshine from "./animations/Sunshine";
import StarryNight from "./animations/StarryNight";
import Mist from "./animations/Mist";
import SoundEffect from "./animations/SoundEffect";
import { WeatherContext } from "../../context/CurrentInfoContext";
import { checkDayNight } from "./commonFunc";

const WeatherAnimation = () => {
  const asset = useContext(WeatherContext);

  const setWeatherAni = () => {
    switch (asset.id) {
      case 2: {
        //thunderstorm + rain + sound
        return (
          <React.Fragment>
            <SoundEffect />
            <Thunderstorms />
            <RainDrops itemCnt="250" angle="20" />
          </React.Fragment>
        );
      }
      case 3: {
        //Drizzle + sound
        return (
          <React.Fragment>
            <SoundEffect />
            <RainDrops itemCnt="100" angle="10" />
          </React.Fragment>
        );
      }
      case 5: {
        //Rain + sound
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
        //Mist or fog
        return <Mist />;
      }
      case 800: {
        //Clear : each day & night
        if (checkDayNight()) {
          return (
            <React.Fragment>
              <SoundEffect />
              <Sunshine />
            </React.Fragment>
          );
        } else return <StarryNight />;
      }
      default: {
        //Clouds
        return <Clouds />;
      }
    }
  };

  return <React.Fragment>{setWeatherAni()}</React.Fragment>;
};

export default WeatherAnimation;
