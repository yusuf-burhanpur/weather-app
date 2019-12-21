const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback)=> {
    const url = 'https://api.darksky.net/forecast/6083af1c597d3be1bc777a3a34d33c33/' + latitude +','+ longitude +'?units=si'
request({url, json:true}, (error,  response) => {
    if (error){
        callback('please check your network connection', undefined)
    }else if(response.body.error){
        callback('unable to find the location', undefined)
    }else {
        callback(undefined, 'it is currently ' + response.body.currently.temperature + ' degrees out, there is ' + response.body.currently.precipIntensity + ' chances of rain')
    }
})
}

module.exports = forecast



