import RGBLed from "../utils/RGBLed";

pinMode(B4, "input_pulldown");

const myLed = new RGBLed(SPI2, B15);

setWatch((e) => {
  myLed.setColor(e.state ? 'red': 'off', 0.01);
}, B4, { repeat: true, debounce : 100, edge: "both" });