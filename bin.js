import espruino from 'espruino'
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

import { rollup } from 'rollup'
import silenceStdout from './utils/silenceStdout.js'

async function run(input, selectedPort) {
    let code = await createBundle(input)

    code = code.replace('\'use strict\';', '')

    code  = 'digitalPulse(LED2, true, [50, 50, 50, 50, 50, 50, 50]);\n\n' + code

    console.log('\n\n -------------------- generated bundle ---------------\n\n')
    console.log(code)
    console.log('\n\n -----------------------------------------------------\n\n')

    flashToEspruino(code, selectedPort)
}

async function flashToEspruino(code, selectedPort) {
    console.log('flashing...')
    
    const unSilence = silenceStdout()
    espruino.init((a) => {
        Espruino.Core.Serial.getPorts((ports) => {
            const portExists = ports.some(port => port.path === selectedPort)
            if (!portExists) {
                const availablePorts = ports.map(port => port.path).join(', ')
                console.error(`${selectedPort} not found, available Ports: ${availablePorts}`)
                return
            }
            
            espruino.sendCode(selectedPort, code, (result) => {
                unSilence()
                console.log(result)
            })
        })
    })
}

async function createBundle(input) {
    const unSilence = silenceStdout()

    unSilence.writeAnyway('bundling...')
    const bundle = await rollup({
        input,
        output: {
          dir: 'build',
          format: 'cjs'
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' })
        ]
    })

    unSilence.writeAnyway('generating output...')
    const { output } = await bundle.generate({
        format: 'cjs',
        name: 'bin',
        sourcemap: true,        
    })


    bundle.close()
    unSilence()

    if (output.length > 1) {
        console.error('more than one output file, I don\'t know what to do now 🤷‍♀️')
        return
    }

    return output[0].code
}

run(process.argv[2], process.argv[3])