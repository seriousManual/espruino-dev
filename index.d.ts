
declare global {
    type Pin = number

    // this is a *very* incomplete list of types for all available pins

    var A8: Pin
    var B4: Pin
    var B15: Pin

    var LED1: Pin
    var LED2: Pin

    type PinMode = 'analog' |'input' |'input_pullup' |'input_pulldown' |'output' |'opendrain' |'af_output' | 'af_opendrain'
    function pinMode (pin: Pin, mode: PinMode, automatic?: boolean): void

    type Edge = 'rising' | 'falling' | 'both'
    interface SetWatchOptions {
      repeat?: boolean
      debounce?: number
      edge?: Edge
    }
    interface WatchEvent {
      state: boolean
      time: number
      lastTime: number
    }
    function setWatch (handler: (event: WatchEvent) => void, pin: Pin, options?: SetWatchOptions): void

    function digitalWrite (pin: Pin, value: boolean): void
    function digitalRead (pin: Pin): boolean

    // ::::::::: SPI :::::::::

    interface SPISetupOptions {
      baud: number
      mosi: Pin
    }

    interface SPI {
      setup: (options: SPISetupOptions) => void
      send4bit: (data: number[], bit0: number, bit1: number) => void
    }

    var SPI1: SPI
    var SPI2: SPI
    var SPI3: SPI
}

export {}
