const db = require('../../database/index.js');
let Parser = require('rss-parser');
let parser = new Parser();

const fetchWater = () => {

    (async () => {

        let feed = await parser.parseURL("https://www.ncei.noaa.gov/access/data/coastal-water-temperature-guide/rss/cpac.xml?format=rss");
        console.log(feed.title);

        feed.items.forEach(item => {
            console.log(item.title + ':' + item.description)
            // if (feed.item.title === 'San Francisco CA') {
            //     console.log("SF: ", feed.item.text);
            // }
        });
    })();
};

module.exports.fetchWater = fetchWater;