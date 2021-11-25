import Button from '../utils/Button'

import { color, colors } from '../utils/RGBLed'

const neopixel = require('neopixel')
const ledStripPin = B15

function setAll (color: color | [number, number, number], howMany: number = 10): void {
  const colorDetails = Array.isArray(color) ? color : colors[color]
  const mult = 0.3

  var arr = new Uint8ClampedArray(howMany * 3)
  var n = 0
  for (var i = 0; i < howMany; i++) {
    arr[n++] = colorDetails[1] * mult
    arr[n++] = colorDetails[0] * mult
    arr[n++] = colorDetails[2] * mult
  }

  neopixel.write(ledStripPin, arr)
}

// setAll('yellow')

// function writeRandomStuff (): void {
//   const len = 150
//   var arr = new Uint8ClampedArray(len * 3)
//   var n = 0
//   for (var i = 0; i < len; i++) {
//     arr[n++] = Math.random() * 10
//     arr[n++] = Math.random() * 10
//     arr[n++] = Math.random() * 10
//   }
//   neopixel.write(ledStripPin, arr)
// }

// new Button(BTN, { debounce: 100 }).down(() => setAll('off'))

// function hslToRgb (h, s, l) {
//   var r, g, b

//   if (s == 0) {
//     r = g = b = l // achromatic
//   } else {
//     var hue2rgb = function hue2rgb (p, q, t) {
//       if (t < 0) t += 1
//       if (t > 1) t -= 1
//       if (t < 1 / 6) return p + (q - p) * 6 * t
//       if (t < 1 / 2) return q
//       if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
//       return p
//     }

//     var q = l < 0.5 ? l * (1 + s) : l + s - l * s
//     var p = 2 * l - q
//     r = hue2rgb(p, q, h + 1 / 3)
//     g = hue2rgb(p, q, h)
//     b = hue2rgb(p, q, h - 1 / 3)
//   }

//   return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
// }

// neopixel.write(ledStripPin, hslToRgb(0.5, 1, 0.5))

// let current = 0
// setInterval(() => {
//   current = (current + 0.01) % 1

//   const rgb = hslToRgb(current, 1, 0.5)
//   console.log(current, rgb)
//   neopixel.write(ledStripPin, rgb)
// }, 1000)

// 255, 255, 0   yellow        255, 255, 0
// 0,   255, 0   red           255, 0,   0
// 0,   255, 255 pink          255, 0,   255
// 0,   0,   255 blue          0,   0,   255
// 255, 0,   255 turquoise     0,   255, 255
// 255, 0,   0   green         0,   255, 0

// const a = 3000

// function swipe (): void {
//   setAll('off')
//   setTimeout(() => setAll('yellow'), a)
//   setTimeout(() => setAll('red'), 2 * a)
//   setTimeout(() => setAll('pink'), 3 * a)
//   setTimeout(() => setAll('blue'), 4 * a)
//   setTimeout(() => setAll('turquiose'), 5 * a)
//   setTimeout(() => setAll('green'), 6 * a)
//   setTimeout(() => setAll('off'), 7 * a)
// }

// swipe()

setAll([255, 150, 0])
setTimeout(() => setAll('off'), 5000)
