const request = require('postman-request')

const url_template = 'http://api.weatherstack.com/current?access_key={{access_token}}&query={{latitude}},{{longitude}}&units=m'

const fetchWeather = (location, access_token, callback) => {
    const url = url_template.replace('{{access_token}}', access_token)
    .replace('{{latitude}}', location.latitude)
    .replace('{{longitude}}', location.longitude)
    request({url: url, json: true}, (error, response) => {
        if (error) callback('Unable to connect to weather service', undefined)
        else if (response.body.error) callback(response.body.error.info, undefined)
        else callback(undefined, 
            {
                temperature: response.body.current.temperature + '°C',
                description: response.body.current.weather_descriptions[0]
            })
    })
}

module.exports = fetchWeather