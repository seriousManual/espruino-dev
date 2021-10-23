class Blinker {
    private intervalHandle: number = null

    constructor(private pin) {}

    start() {
        digitalWrite(this.pin, 0)
        
        this.intervalHandle = setInterval(() => {
            digitalWrite(this.pin, !digitalRead(this.pin))
        }, 100)
    }

    stop() {
        if (!this.intervalHandle) {
            return
        }

        clearInterval(this.intervalHandle)
    }
}

export default Blinker