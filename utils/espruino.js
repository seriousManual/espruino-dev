import espruino from 'espruino'

export function init () {
  return new Promise(resolve => espruino.init(resolve))
}

export function getPorts () {
  return new Promise(resolve => Espruino.Core.Serial.getPorts(resolve))
}

export function sendCode (port, code) {
  return new Promise(resolve => espruino.sendCode(port, code, resolve))
}
