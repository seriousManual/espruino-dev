import { RGBLedChain } from '../utils/RGBLed'
import Button from '../utils/Button'

const myChain = new RGBLedChain(SPI2, B15)
const myLed = myChain.getRgbLed()
const myButton = new Button(B4, { debounce: 100 })

myButton
  .down(() => myLed.setColor('red', 0.01))
  .up(() => myLed.setColor('off', 0.01))
