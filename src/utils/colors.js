const blendHexColors = (colorA, colorB, amount) => {
  // I took this function from stack overflow, just cleaned it up a bit.

  const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
  const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * amount)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(gA + (gB - gA) * amount)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(bA + (bB - bA) * amount)
    .toString(16)
    .padStart(2, "0");
  return "#" + r + g + b;
};

const colorCold = '#00ffff';
const colorMiddle = '#fff700';
const colorWarm = '#ff8c00';

const temperatureCold = -10;
const temperatureMiddle = 10;
const temperatureWarm = 30;

const getTemperatureColor = (temperature = 0) => {
  if (temperature < temperatureCold) {
      return colorCold;
  } else if (temperature > temperatureWarm) {
      return colorWarm;
  } else if (temperature < temperatureMiddle) {
    const diff = Math.abs(temperatureMiddle - temperature) / (temperatureMiddle + Math.abs(temperatureCold));

    return blendHexColors(colorMiddle, colorCold, diff);
  } else if (temperature >= temperatureMiddle) {
    const diff = Math.abs(1 - temperatureWarm / temperature);

    return blendHexColors(colorWarm, colorMiddle, diff);
  }
}

export { getTemperatureColor };
