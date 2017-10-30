var AsyncPolling = require('async-polling');
var scrapper = require('./scraper');
var firebase = require('./firebaseDB');
var config = require('./config/config');
var exports = module.exports = {};


exports.scrapeUpload30s = AsyncPolling(function (end) {
    result = 0;
    Object.keys(firebase.routeEncodings).forEach(function (v) {
        scrapper.getBusSchedule(firebase.routeEncodings[v], function (out) {
            firebase.updateRouteSchedule(v, out);
            if (++result == Object.keys(firebase.routeEncodings).length)
                end(null, result);
        });
    });
}, config.scrapeCiclicityInMs);

exports.scrapeUpload30s.on('result', function (result) {
    console.log('Uploaded', result, 'routes to Firebase. |', new Date().toUTCString());
});
exports.scrapeUpload30s.on('error', function (err) {
    console.log('An error was encountered during the cyclic task:', err);
});