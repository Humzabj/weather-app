const yargs = require('yargs')

yargs.command('get', 'Fetch weather for a location', (yargs) => {
    return yargs
        .option('adrs', {
            describe: 'Address to fetch weather',
            type: 'string',
            requiresArg: true,
            demandOption: true
        })
        .option('wat', {
            describe: 'Weatherstack api access token',
            type: 'string',
            requiresArg: true,
            demandOption: true
        })
        .option('gat', {
            describe: 'Mapbox api access token',
            type: 'string',
            requiresArg: true,
            demandOption: true
        })
}, (argv) => {
    console.log(argv.adrs, argv.wat, argv.gat)

    // use callback function here
})
.demandCommand()
.help(false)
.version(false)
.argv

yargs.parse()