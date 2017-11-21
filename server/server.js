const express = require('express');
const path = require('path');
const http = require('http');
const config = require('./config/config.js');
var cyclicTask = require('./cyclictask');
var firebase = require('./firebaseDB');

const app = express();

/**
 * Map folder for all static assets required by Angular
 */
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * Add response when the map is requested
 */
app.get('/map', function (req, res) {
    res.sendfile(__dirname +'/mapper/getMap.html');
    console.log('Got a connection! |', new Date().toUTCString());
});

/**
 * Catch all other routes and return the index file
 */
app.get('*', function (req, res)  {

    res.sendfile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || config.APP_PORT;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function() {console.log('Successfully listening on port ' + config.APP_PORT); });

/**
 * Fetch the encoding for the RATT website URLs from the Database then start scraping
 */
firebase.getRouteEncoding(function () {
    //console.log(firebase.routeEncodings); // debug
    console.log('Started Scrap & Upload routine. (cyclic, performed every 30 seconds)');
    cyclicTask.scrapeUpload30s.run();
});
/**
 *  Upload the route encodings from the csv generated by running the python script
 */
//firebase.updateRouteEncoding();
// TODO use firebase.updateRouteEncoding when spawning the python script <scripts/HTMLscrapper.py> in a new process as a callback

/** -----------------------------------------------------------------------
 * Old server implementation
 */
/*
app.listen(config.APP_PORT, function () {
   console.log('Successfully listening on port ' + config.APP_PORT);
    app.get('/routes', function (req, res) {
        res.sendfile(__dirname + '/routes/index.html');
        console.log('Got a connection! |', new Date().toUTCString());
    });
    app.get('/', function (req, res) {
        res.sendfile(__dirname +'/mapper/getMap.html');
        console.log('Got a connection! |', new Date().toUTCString());
    });

    app.get('*', function (req, res) {
        //res.sendfile(__dirname + '/client/forohfour.html');
        //TODO create 404 html page
        res.send('Four oh four..');
        console.error('Invalid connection|', new Date().toUTCString());
    })
});
*/


