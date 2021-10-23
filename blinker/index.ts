import * as ms from 'ms'

pinMode(B4, "input_pulldown")

import Blinker from "./lib/Blinker";

const a = new Blinker(LED2, ms('1s'))
const b = new Blinker(LED1, ms('2s'))

// a.start()
// b.start()

setWatch((e) => {
    a.running() ? a.stop() : a.start()
    b.running() ? b.stop() : b.start()
}, B4, { repeat: true, debounce : 100, edge: "rising" });