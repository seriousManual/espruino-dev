interface ButtonOptions {
    debounce?: number
}

type handler = Function
type handlerList = handler[]

class Button {
    private downHandlers: handlerList = []
    private upHandlers: handlerList = []

    constructor(pin: Pin, options?: ButtonOptions) {
        pinMode(pin, "input_pulldown");

        const watchOptions: SetWatchOptions = { repeat: true, edge: "both" }

        if (options) {
            if (options.debounce) {
                watchOptions.debounce = options.debounce
            }
        }

        setWatch((e) => {
            (e.state ? this.downHandlers : this.upHandlers).forEach(handler => handler())
        }, pin, watchOptions);
    }

    down(handler: handler): Button {
        this.downHandlers.push(handler)
        return this
    }

    up(handler: handler): Button {
        this.upHandlers.push(handler)
        return this
    }
}

export default Button;