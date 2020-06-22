const request = require("postman-request")

const url_template = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{{address}}.json?access_token={{access_token}}&limit=1'

const geocode = (address, access_token, callback) => {
    const url = url_template.replace('{{address}}', encodeURI(address)).replace('{{access_token}}', access_token)
    request({url: url, json: true}, (error, response) => {
        if (error) callback('failed to connect to geolocation service')
        else if (response.body.error) callback(response.body.error)
        else if (response.body.message === 'Not Authorized - Invalid Token') callback(response.body.message)
        else if (response.body.features.length === 0) callback('Unable to find location. Try another search term')
        else callback(undefined, 
            {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location_name: response.body.features[0].place_name
            })
    })
}

module.exports = geocode
