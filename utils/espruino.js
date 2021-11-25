import espruino from 'espruino'

export function init () {
  return new Promise(resolve => espruino.init(resolve))
}

export function getPorts () {
  return new Promise(resolve => Espruino.Core.Serial.getPorts(resolve))
}

export async function sendCodeAndStream (code) {
  await sendCode(code)

  Espruino.Core.Serial.startListening(function (data) {
    if (data instanceof ArrayBuffer) {
      const fart = new TextDecoder().decode(data)
      const zippzapp = fart.trim().replace(/>$/, '').trim()

      if (zippzapp !== '') {
        console.log(`> ${zippzapp}`)
      }
    }
  })
}

export function open (port) {
  return new Promise((resolve, reject) => {
    Espruino.Core.Serial.open(port, function (status) {
      if (status === undefined) {
        return reject(new Error('meh'))
      }

      resolve()
    })
  })
}

export function sendCode (code) {
  return new Promise((resolve, reject) => {
    Espruino.callProcessor('transformForEspruino', code, function (code) {
      console.log('code', code)

      Espruino.Core.CodeWriter.writeToEspruino(code, function () {
        resolve()
      })
    })
  })
}

export function executeStatement (expr) {
  return new Promise((resolve, reject) => {
    // Espruino.Core.Serial.startListening(function (data) {

    // })

    Espruino.Core.Utils.executeStatement(expr, result => {
      setTimeout(resolve, 500)
    })
  })
};

export function close () {
  console.log('closing...')
  Espruino.Core.Serial.close()
}
