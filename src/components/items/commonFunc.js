const randomInRange = (max, min) =>
  Math.floor(Math.random() * (max - min)) + min;

// check day or night on current user location
const checkDayNight = () => {
  const date = new Date();
  const hour = date.getHours();
  return hour >= 7 && hour < 19 ? true : false;
};

// check day or night on selected location
const checkDayNightbyTimeZone = tz => {
  const tzDate = new Date().toLocaleString("en-US", { timeZone: tz });
  const tzTime = new Date(tzDate);
  const hour = tzTime.getHours();
  return hour >= 7 && hour < 19 ? true : false;
};

// get current time by locale string
export const getCurrentTime = tz => {
  let date = null;
  if (tz === null) date = new Date();
  else date = new Date().toLocaleString("en-US", { timeZone: tz });

  const localDate = date.toLocaleString();
  return localDate;
};

export { randomInRange, checkDayNight, checkDayNightbyTimeZone };
