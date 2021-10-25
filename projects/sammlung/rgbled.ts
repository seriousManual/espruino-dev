import RGBLed from "../utils/RGBLed";
import Button from "../utils/Button";

const myLed = new RGBLed(SPI2, B15);
const myButton = new Button(B4, {debounce: 100});

myButton
  .down(() => myLed.setColor('red', 0.01))
  .up(() => myLed.setColor('off', 0.01))