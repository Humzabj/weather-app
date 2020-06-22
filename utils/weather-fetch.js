// 1a45de27b760774e05a8b09d4c9b4799 Access token mine
const request = require('postman-request')

const url_template = 'http://api.weatherstack.com/current?access_key={{access_token}}&query={{latitude}},{{longitude}}&units=m'

const fetchWeather = (location, access_token, callback) => {
    console.log(location)
    const url = url_template.replace('{{access_token}}', access_token)
    .replace('{{latitude}}', location.latitude)
    .replace('{{longitude}}', location.longitude)
    console.log(url)
    request({url: url, json: true}, (error, response) => {
        if (error) callback('Unable to connect to weather service', undefined)
        else if (response.body.error) callback(response.body.error.info, undefined)
        else callback(undefined, response.body)
    })
}

module.exports = fetchWeather