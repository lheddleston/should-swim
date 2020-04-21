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
    let queryString = `INSERT INTO current (date, dayRain, temp, windSpeed) VALUES (${cleanData.date}, ${cleanData.dayRain}, ${cleanData.temp}, ${cleanData.windSpeed})`;
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

    let queryString = `SELECT * FROM current limit 1;`;
    connection.query(queryString, (error, data) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, data);
        }
    })
};

module.exports = {
    connection,
    postWeather,
    getWeather
};

