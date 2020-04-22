const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((error) => {
    if (error) {
        console.log('Error connecting to the database: ', error);
    }
    console.log('Connected to the database!');
});

const postWeather = (cleanData, callback) => {
    console.log("Clean Data from the DB", cleanData);
    let queryString = `INSERT INTO current (date, dayRain, temp, windSpeed, visibility) VALUES (${cleanData.date}, ${cleanData.dayRain}, ${cleanData.temp}, ${cleanData.windSpeed}, ${cleanData.visibility})`;
    connection.query(queryString, (error, data) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, data);
        }
    })
};
const postWater = (waterTemp, callback) => {
    let queryString = `INSERT INTO water (temp) VALUES (${waterTemp.temp})`;
    connection.query(queryString, (error, data) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, data);
        }
    })
};
const getWeather = (value, callback) => {
    let queryString = `SELECT * FROM current ORDER BY date DESC LIMIT 1;`;
    connection.query(queryString, (error, data) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, data);
        }
    });
};
const getWater = (value, callback) => {
    let queryString = `SELECT * FROM water ORDER BY temp DESC LIMIT 1;`;
    connection.query(queryString, (error, data) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, data);
        }
    });
};

module.exports = {
    connection,
    postWeather,
    postWater,
    getWeather,
    getWater
};

