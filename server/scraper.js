const config = require('./config/config.js');
var request = require('request');
var cheerio = require('cheerio');

function Station(name, time) {
    this.name = name;
    this.time = time;
}

function Route(name) {
    this.routeName = name;
    this.stationsArr = [];
}

function addStation(route, station) {
    route.stationsArr.push(station);
}


function Routes(firstRoute, secondRoute) {
    this.inbound = firstRoute;
    this.outbound = secondRoute;
}

module.exports.getBusSchedule = function (param1, callback) {

    var url = config.RATT_ROUTE_URL + param1;

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html, {
                normalizeWhitespace: true
            });
            var firstRoute, secondRoute;
            var first = false;
            var skipDescription;
            $('table').each(function (i, elem) {
                if ($(this).text().trim().indexOf('Linia ') > -1) {
                    skipDescription = true;
                    first = !first;
                    if (first)
                        firstRoute = new Route($(this).text().trim());
                    else
                        secondRoute = new Route($(this).text().trim());
                } else {
                    if (!firstRoute && !secondRoute) {
                        console.log('the wrong one is:',param1);
                        return 'continue';
                    }
                    // add to routes the station and est. time of arrival.
                    if (skipDescription) {
                        skipDescription = false;
                        return 'continue'; // Trick to skip current iteration
                    }
                    var tmpQuery = $('tr td', this);
                    var tmpStation = new Station(tmpQuery.eq(0).text().trim(), tmpQuery.eq(1).text().trim());
                    addStation(first ? firstRoute : secondRoute, tmpStation);
                    //console.log(tmpStation.name, ' ', tmpStation.time); // debug
                }
            });
            //console.log(JSON.stringify(new Routes(inbound, outbound), null, 4)); // debug
            var ret = new Routes(firstRoute, secondRoute);
            callback(ret);
        } else {
            console.error(error);
        }
    })
};