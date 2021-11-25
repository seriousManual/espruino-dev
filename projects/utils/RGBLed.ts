import clamp from './clamp'

export type color = 'yellow' | 'red' | 'pink' | 'blue' | 'turquiose' | 'green' | 'white' | 'off'
export type colorTuple = [number, number, number]
export type colorMap = Record<color, colorTuple>

export const colors: colorMap = {
  yellow: [255, 255, 0],
  red: [255, 0, 0],
  pink: [255, 0, 255],
  blue: [0, 0, 255],
  turquiose: [0, 255, 255],
  green: [0, 255, 0],
  white: [255, 255, 255],
  off: [0, 0, 0]
}

export class RGBLedChain {
  private transaction: boolean = false
  private readonly leds: RGBLed[] = []

  constructor (private readonly spi: SPI, mosi: Pin) {
    this.spi.setup({ baud: 3200000, mosi })
  }

  update (): void {
    if (this.transaction) {
      return
    }

    this.write()
  }

  openTransaction (): () => void {
    this.transaction = true

    return () => {
      this.transaction = false
      this.write()
    }
  }

  setAll (colors: Array<[color, number]>): void;
  setAll (color: color, brightness?: number): void;
  setAll (color: color | Array<[color, number]>, brightness: number = 1): void {
    const commitTransaction = this.openTransaction()

    if (Array.isArray(color)) {
      color.forEach(([color, brightness], index) => {
        this.leds[index].setColor(color, brightness)
      })
    } else {
      this.leds.forEach(led => led.setColor(color, brightness))
    }

    commitTransaction()
  }

  off (): void {
    this.setAll('off', 0)
  }

  private write (): void {
    const colorValues = this.leds.reduce<number[]>((carray, led) => {
      return carray.concat(led.getColorTuple())
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
  private color: colorTuple = [0, 0, 0]

  constructor (private readonly parent: RGBLedChain) {}

  public setColor (color: color | colorTuple, brightness: number = 1): void {
    if (Array.isArray(color)) {
      this.color = color
      return
    }

    const colorDefinition = colors[color]
    const clampedBrightness = clamp(brightness, 0, 1)

    this.color = [
      colorDefinition[0] * clampedBrightness,
      colorDefinition[1] * clampedBrightness,
      colorDefinition[2] * clampedBrightness
    ]

    this.parent.update()
  }

  getColorTuple (): colorTuple {
    return this.color
  }

  off (): void {
    this.setColor('off')
  }

  random (): void {
    this.setColor([
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    ], 0.3)
  }
}
