const ts = require('typescript')
const rollup = require('rollup')

async function run(input) {

}

async function getCompleteBundle(input) {
    const bundle = await rollup.rollup({ input })

    const { output } = await bundle.generate({
        format: 'cjs',
        name: 'bin',
        sourcemap: true,        
    })

    if (output.length > 1) {
        throw new Error('more than one output file! 🤷‍♀️')
    }

    console.log(output[0].code);
    
}

async function beer(inputDirectory) {
    
}

run()