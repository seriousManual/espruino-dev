import Blinker from './lib/Blinker';
import randomNumber from '../utils/randomNumber'
import Button from '../utils/Button';

const a = new Blinker(LED2, randomNumber(100, 500))
const b = new Blinker(LED1, randomNumber(100, 500))

const myButton = new Button(B4, { debounce: 100 });
myButton.down(() => { a.toggle(); b.toggle() })