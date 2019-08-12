const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
let location = process.argv[2];

geocode(location = location || "Boston", (error, {
    latitude,
    longitude,
    location
}) => {
    if (error) {
        return console.log('Error', error)
    }

    console.log(location)
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return console.log('Error', error)
        }

        console.log('Data', forecastData)
    })
})