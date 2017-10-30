var exports = module.exports = {};

exports.APP_PORT = 8080;
exports.RATT_ROUTE_URL = 'http://86.122.170.105:61978/html/timpi/trasee.php?param1=';
exports.routeEncodingPath = '../scripts/stations.csv';
exports.scrapeCiclicityInMs = 30000; // when changing the value of this variable, also refactor the method scrapeUpload30s to reflect the new cyclicity
