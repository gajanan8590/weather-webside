const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5e00cf37a6746e0717f5616bed436247&query='+ address
   
    request({ url, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (res.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, address + ' Country temperature is  ' + res.body.current.temperature)
        }
    })
}

module.exports = forecast