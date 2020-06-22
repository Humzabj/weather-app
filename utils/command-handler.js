const yargs = require('yargs')
const weatherApi = require('./weather-fetch.js')
const locationApi = require('./location-fetch.js')
const chalk = require('chalk')

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
    locationApi(argv.adrs, argv.gat, (error, locationData) => {
        if (error) console.log(chalk.bgRed('Error: ' + error))
        else console.log(chalk.bgGreenBright.black('Location: ', locationData.location_name))
        if (!error) weatherApi(locationData, argv.wat, (error, weatherData) => {
            if (error) console.log(chalk.bgRed('Error: ' + error))
            else {
                console.log(chalk.bgBlueBright.black(
                'Temperature: ' + weatherData.temperature + '\n' +
                'Description: ' + weatherData.description
                ))
            }
        })
    })
})
.demandCommand()
.help(false)
.version(false)
.argv

yargs.parse()