import espruino from 'espruino'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import { rollup } from 'rollup'
import silenceStdout from './utils/silenceStdout.js'
import parseArgs from './utils/parseArgs.js'

async function run () {
  const args = parseArgs()

  let code = await createBundle(args.entryPoint, args)

  code = code.replace('\'use strict\';', '')

  if (args.preamble) {
    code = 'digitalPulse(LED2, true, [50, 50, 50]);\n' + code
  }

  if (args.showcode) {
    console.log('\n -------------------- generated bundle ---------------\n')
    console.log(code)
    console.log('-----------------------------------------------------\n')
  }

  if (args.save) {
    code += '\nsave();'
  }

  flashToEspruino(code, args, _ => {
    console.log('✔️')
  })
}

async function flashToEspruino (code, args, callback) {
  if (!args.flash) {
    console.log('-> flashing suppressed')
    return callback(null)
  }

  const { port: selectedPort } = args
  console.log('flashing...')

  const unSilence = silenceStdout(true)

  espruino.init(() => {
    Espruino.Core.Serial.getPorts((ports) => {
      const portExists = ports.some(port => port.path === selectedPort)
      if (!portExists) {
        const availablePorts = ports.map(port => port.path).join(', ')
        console.error(`${selectedPort} not found, available Ports: ${availablePorts}`)
        return
      }

      espruino.sendCode(selectedPort, code, (result) => {
        unSilence()

        if (args.showresult) {
          console.log(result)
        }

        callback(null)
      })
    })
  })
}

async function createBundle (input, args) {
  const unSilence = silenceStdout()

  unSilence.writeAnyway(`bundling${args.minify ? ' (minified)' : ''}...`)

  const plugins = [
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' })
  ]

  if (args.minify) {
    plugins.push(terser())
  }

  const bundle = await rollup({
    input,
    output: {
      dir: 'build',
      format: 'cjs'
    },
    plugins
  })

  unSilence.writeAnyway('generating output...')
  const { output } = await bundle.generate({
    format: 'cjs',
    name: 'bin',
    sourcemap: true
  })

  bundle.close()
  unSilence()

  if (output.length > 1) {
    console.error('more than one output file, I don\'t know what to do now 🤷‍♀️')
    return
  }

  return output[0].code
}

run()
