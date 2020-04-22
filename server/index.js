const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const weather = require('./weather/weather.js');
const water = require('./water/temp');
const db = require('../database/index');

/********* Middleware *********/
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/********* Routes + Controllers *********/
app.post('/weather', (req, res) => {
    console.log('POST request for weather received');
    weather.fetchWeather(req, (error, data) => {
        if (error) {
            console.log('Error posting weather to the database: ', error);
            res.status(400);
        }
        else {
            res.status(200);
            console.log('Posted weather data!');
        }
    });
});

app.get('/weather', (req, res) => {
    console.log('GET request for weather received');
    db.getWeather(req, (error, data) => {
        if (error) {
            console.log('Error getting weather from the database: ', error);
            res.status(400);
        }
        else {
            res.status(200);
            res.send(data);
            console.log('Retrieved weather data from the database!');
        }
    });
})

app.post('/water', (req, res) => {
    console.log('POST request for water received');
    water.fetchWater(req, (error, data) => {
        if (error) {
            console.log('Error posting waterTemp to the database: ', error);
            res.status(400);
        }
        else {
            res.status(200);
            console.log('Posted water temp data!');
        }
    });
});

app.get('/water', (req, res) => {
    console.log('GET request for water temp received');
    db.getWater(req, (error, data) => {
        if (error) {
            console.log('Error getting water temp from the database: ', error);
            res.status(400);
        }
        else {
            res.status(200);
            res.send(data);
            console.log('Retrieved water temp data from the database!');
        }
    });
})

/********* Start App *********/
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})