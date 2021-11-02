import clamp from './clamp'

type color = 'red' | 'green' | 'yellow' | 'blue' | 'white' | 'off'
type colorMap = Record<color, [number, number, number]>

const colors: colorMap = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  yellow: [255, 255, 0],
  blue: [0, 0, 255],
  white: [255, 255, 255],
  off: [0, 0, 0]
}

export class RGBLedChain {
  private readonly leds: RGBLed[] = []

  constructor (private readonly spi: SPI, mosi: Pin) {
    this.spi.setup({ baud: 3200000, mosi })
  }

  update (): void {
    const colorValues = this.leds.reduce<number[]>((carray, led) => {
      // return [...carray, ...led.getColors()]
      return carray.concat(led.getColors())
    }, [])

    this.spi.send4bit(colorValues, 0b0001, 0b0011)
  }

  getRgbLed (): RGBLed {
    const led = new RGBLed(this)
    this.leds.push(led)

    return led
  }
}

export class RGBLed {
  private color: [number, number, number] = [0, 0, 0]

  constructor (private readonly parent: RGBLedChain) {}

  public setColor (color: color, brightness: number = 1): void {
    const colorDefinition = colors[color]
    const clampedBrightness = clamp(brightness, 0, 1)

    this.color = [
      colorDefinition[0] * clampedBrightness,
      colorDefinition[1] * clampedBrightness,
      colorDefinition[2] * clampedBrightness
    ]

    this.parent.update()
  }

  getColors (): [number, number, number] {
    return this.color
  }
}
