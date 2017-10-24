const config = require('./config/config.js');
var request = require('request');
var cheerio = require('cheerio');

module.exports.getBusSchedule = function(id) {

    url = config.RATT_ROUTE_URL + id;

    request(url, function(error, response, html) {
        if (!error){
            var $ = cheerio.load(html);
            var routes = [];
            var stationName, stationTime;
            var cnt = -1;
            $('table').each(function(i, elem) {
                if ($(this).css("color") === "white"){
                    //routes.push({routename : $(this).children().children().text()});
                    routes.push($(this).text());
                    cnt++;
                } else {
                   // routes[cnt].push
                    // add to routes the station and est. time of arrival.
                }


            });

             console.log('routes: ' + routes.toString());

        }
    })
};