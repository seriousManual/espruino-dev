class Blinker {
  private intervalHandle: number | undefined

  constructor (private readonly pin: Pin, private readonly interval: number = 500) {}

  start (): void {
    digitalWrite(this.pin, false)

    this.intervalHandle = setInterval(() => {
      digitalWrite(this.pin, !digitalRead(this.pin))
    }, this.interval)
  }

  stop (): void {
    if (!this.running()) {
      return
    }

    digitalWrite(this.pin, false)

    clearInterval(this.intervalHandle)
    this.intervalHandle = undefined
  }

  toggle (): void {
    if (this.running()) {
      this.stop()
    } else {
      this.start()
    }
  }

  running (): boolean {
    return this.intervalHandle !== undefined
  }
}

export default Blinker
