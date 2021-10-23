import espruino from 'espruino'
import typescript from '@rollup/plugin-typescript';
import { rollup } from 'rollup'

async function run(input, selectedPort) {
    const code = await createBundle(input)

    console.log(code)

    flashToEspruino(code, selectedPort)
}

async function flashToEspruino(code, selectedPort) {
    console.log('flashing...')

    const oldWrite = process.stdout.write

    const pile = []
    process.stdout.write = () => {
        pile.push('🙈')
    }

    espruino.init((a) => {
        Espruino.Core.Serial.getPorts((ports) => {
            const portExists = ports.some(port => port.path === selectedPort)
            if (!portExists) {
                throw new Error(`${selectedPort} not found!`)
            }
            
            espruino.sendCode(selectedPort, code, (error) => {
                process.stdout.write = oldWrite
                console.log(`I silenced ${pile.length} messages`)

                console.log(error)
            })
        })
    })
}

async function createBundle(input) {
    console.log('bundling...')
    const bundle = await rollup({
        input,
        output: {
          dir: 'build',
          format: 'cjs'
        },
        plugins: [
            typescript({
                lib: ['es2015'],
                target: 'es5',
            })
        ]
    })

    console.log('generating output...')
    const { output } = await bundle.generate({
        format: 'cjs',
        name: 'bin',
        sourcemap: true,        
    })

    if (output.length > 1) {
        throw new Error('more than one output file, I don\'t know what to do now 🤷‍♀️')
    }

    bundle.close()

    return output[0].code
}

run(process.argv[2], process.argv[3])