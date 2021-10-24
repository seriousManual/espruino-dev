class Blinker {
    private intervalHandle: NodeJS.Timer | null = null

    constructor(private pin, private interval: number = 500) {}

    start() {
        digitalWrite(this.pin, 0)
        
        this.intervalHandle = setInterval(() => {
            digitalWrite(this.pin, !digitalRead(this.pin))
        }, this.interval)
    }

    stop() {
        if (!this.intervalHandle) {
            return
        }

        digitalWrite(this.pin, 0)

        clearInterval(this.intervalHandle)
        this.intervalHandle = null
    }

    running() {
        return this.intervalHandle !== null
    }
}

export default Blinker