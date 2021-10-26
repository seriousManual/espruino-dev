interface ButtonOptions {
  debounce?: number
}

type handler = Function
type handlerList = handler[]

class Button {
  private readonly downHandlers: handlerList = []
  private readonly upHandlers: handlerList = []

  constructor (pin: Pin, options?: ButtonOptions) {
    pinMode(pin, 'input_pulldown')

    const watchOptions: SetWatchOptions = { repeat: true, edge: 'both' }

    if (options != null) {
      if (options.debounce !== undefined) {
        watchOptions.debounce = options.debounce
      }
    }

    setWatch((e) => {
      const list = e.state ? this.downHandlers : this.upHandlers
      list.forEach(handler => handler())
    }, pin, watchOptions)
  }

  down (handler: handler): Button {
    this.downHandlers.push(handler)
    return this
  }

  up (handler: handler): Button {
    this.upHandlers.push(handler)
    return this
  }
}

export default Button
