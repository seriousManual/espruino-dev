pinMode(B4, 'input_pulldown')

import Blinker from './lib/Blinker';
import randomNumber from '../utils/randomNumber'

const a = new Blinker(LED2, randomNumber(100, 500))
const b = new Blinker(LED1, randomNumber(100, 500))

setWatch(_ => {
    a.running() ? a.stop() : a.start()
    b.running() ? b.stop() : b.start()
}, B4, { repeat: true, debounce : 100, edge: 'rising' });
