class Blinker {
    private intervalHandle: number | null = null

    constructor(private pin: Pin, private interval: number = 500) {}

    start() {
        digitalWrite(this.pin, false)
        
        this.intervalHandle = setInterval(() => {
            digitalWrite(this.pin, !digitalRead(this.pin))
        }, this.interval)
    }

    stop() {
        if (!this.intervalHandle) {
            return
        }

        digitalWrite(this.pin, false)

        clearInterval(this.intervalHandle)
        this.intervalHandle = null
    }

    running() {
        return this.intervalHandle !== null
    }
}

export default Blinker