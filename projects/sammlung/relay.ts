import Button from "../utils/Button";

const relayPin = A8
digitalWrite(relayPin, true);

const myButton = new Button(B4, { debounce: 100 });
myButton
  .down(() => digitalWrite(relayPin, false))
  .up(() => digitalWrite(relayPin, true))