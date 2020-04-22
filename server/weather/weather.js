const config = require('./config');
const axios = require('axios').default;
const db = require('../../database/index.js');

const fetchWeather = (req, callback) => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=37.77&lon=-122.43&appid=${config.API_KEY}`)
        .then((response) => {
            let cleanData = {};
            cleanData.date = response.data.current.dt;
            if (!response.data.daily.rain) {
                cleanData.dayRain = 'false';
            }
            else {
                cleanData.dayRain = 'true';
            }
            let temp = Math.floor(response.data.current.temp * (9 / 5) - 459.67);
            cleanData.temp = temp;
            cleanData.windSpeed = response.data.current.wind_speed;
            cleanData.visibility = Math.floor(response.data.current.visibility);
            console.log('Request to get weather made!', cleanData);
            db.postWeather(cleanData, callback);
        })
        .catch((error) => {
            console.log("Error getting weather data from API: ", error);
        });
}

module.exports.fetchWeather = fetchWeather;