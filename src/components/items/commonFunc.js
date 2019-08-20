const randomInRange = (max, min) =>
  Math.floor(Math.random() * (max - min)) + min;

const checkDayNight = () => {
  const date = new Date();
  const hour = date.getHours();
  return hour >= 7 && hour <= 19 ? true : false;
};

export { randomInRange, checkDayNight };
