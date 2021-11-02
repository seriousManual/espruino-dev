import { RGBLedChain } from '../utils/RGBLed'
import Button from '../utils/Button'

const myChain = new RGBLedChain(SPI2, B15)
const myLed1 = myChain.getRgbLed()
const myLed2 = myChain.getRgbLed()
const myLed3 = myChain.getRgbLed()

const myButton = new Button(BTN, { debounce: 100 })

myChain.setAll('green', 0.4)

let i: number = 0
myButton
  .down(() => {
    const commitTransaction = myChain.openTransaction()

    switch (i) {
      case 0:
        myLed1.setColor('red', 0.1)
        myLed2.off()
        myLed3.off()
        break
      case 1:
        myLed1.off()
        myLed2.setColor('green', 0.1)
        myLed3.off()
        break
      case 2:
        myLed1.off()
        myLed2.off()
        myLed3.setColor('white', 0.1)
        break
    }

    commitTransaction()

    i = (i + 1) % 3
  })
  // .up(() => myLed.setColor('off', 0.01))
