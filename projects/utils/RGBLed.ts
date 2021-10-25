type color = 'red' | 'green' | 'yellow' | 'blue' | 'white' | 'off';
type colorMap = Record<color, [number, number, number]>;

const colors: colorMap = {
    red: [255, 0, 0],
    green: [0, 255, 0],
    yellow: [255, 255, 0],
    blue: [0, 0, 255],
    white: [255, 255, 255],
    off: [0, 0, 0]
};

class RGBLed {
    constructor(private spi: SPI, mosi: Pin) {
        this.spi.setup({ baud: 3200000, mosi });
    }

    public setColor(color: color, brightness: number = 1): void {
        const colorDefinition = colors[color];
        const clampedBrightness = clamp(brightness, 0, 1);

        this.spi.send4bit([
            colorDefinition[0] * clampedBrightness,
            colorDefinition[1] * clampedBrightness,
            colorDefinition[2] * clampedBrightness,
        ], 0b0001, 0b0011);
    }
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export default RGBLed;