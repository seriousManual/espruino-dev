import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

function parseArgs () {
  const {
    entryPoint, port, nopreamble, minify, showcode, noflash, showresult
  } = yargs(hideBin(process.argv))
    .command('$0 [entryPoint] [port]', 'transpile, bundle and deplo', (yargs) => {
      return yargs
        .positional('entryPoint', {
          describe: 'entrypoint of the project to be built'
        })
        .positional('port', {
          describe: 'hardware port the board is plugged into'
        })
        .demandOption('entryPoint')
        .demandOption('port')
    })
    .option('minify', {
      type: 'boolean',
      description: 'minifiy bundle',
      default: false
    })
    .options('nopreamble', {
      type: 'boolean',
      description: 'suppress indicator when flashing has been done',
      default: false
    })
    .options('showcode', {
      type: 'boolean',
      description: 'show the generated code',
      default: false
    })
    .options('noflash', {
      type: 'boolean',
      description: 'do not flash the board',
      default: false
    })
    .options('showresult', {
      type: 'boolean',
      description: 'show the result from the board',
      default: false
    })
    .parse()

  return {
    entryPoint,
    port,

    preamble: !nopreamble,
    minify,
    showcode,
    flash: !noflash,
    showresult
  }
}

export default parseArgs