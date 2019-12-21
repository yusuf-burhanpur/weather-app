const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoieXVzdWZidXJoYW5wdXIxIiwiYSI6ImNrM3R0bWI0aDA2MTUzam9wOWlrdW9od3MifQ.qkc3_Mv6kOgQZTHmOWTkdg'
request({url, json:true}, (error, response )=>{
    if(error){
        callback('please check your network connection')
    }else if(response.body.features[0] === 0){
        callback('unable to find the location')
    }else {
        callback (undefined, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        })
    }
})
}

module.exports = geocode