const relayPin = A8

//pinMode(relayPin, "input_pullup");
pinMode(B4, "input_pulldown");

var leds = new Uint8ClampedArray(3);

digitalWrite(relayPin, true);

SPI2.setup({
  baud: 3200000,
  mosi: B15
});


SPI2.send4bit(leds, 0b0001, 0b0011)

setWatch((e) => {
  const myLeds = [
    e.state ? 30 : 0,
    0,
    0
  ];

  SPI2.send4bit(myLeds, 0b0001, 0b0011);

  digitalWrite(relayPin, !e.state);
}, B4, { repeat: true, debounce : 100, edge: "both" });