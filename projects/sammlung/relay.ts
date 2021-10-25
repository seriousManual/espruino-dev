pinMode(B4, "input_pulldown");

const relayPin = A8
digitalWrite(relayPin, true);

setWatch((e) => {
    digitalWrite(relayPin, !e.state);
}, B4, { repeat: true, debounce : 100, edge: "both" });