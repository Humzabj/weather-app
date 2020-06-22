const yargs = require('yargs')
const weatherApi = require('./weather-fetch.js')
const locationApi = require('./location-fetch.js')

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
    locationApi(argv.adrs, argv.gat, (error, data) => {
        console.log('Error: ', error)
        console.log('Data: ', data)
        weatherApi(data, argv.wat, (error, response) => {
            console.log('Error: ', error)
            console.log('Data: ', response)
        })
    })
    // use callback function here
})
.demandCommand()
.help(false)
.version(false)
.argv

yargs.parse()