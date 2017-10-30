const express = require('express');
const app = express();
const config = require('./config/config.js');
var cyclicTask = require('./cyclictask');
var firebase = require('./firebaseDB');

// Start the server and provide the webpage to clients connected on APP_PORT
app.listen(config.APP_PORT, function () {
    console.log('Successfully listening on port ' + config.APP_PORT);
    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/mapper/getMap.html');
        console.log('Got a connection! |', new Date().toUTCString());
    });
    app.get('*', function (req, res) {
        //res.sendfile(__dirname + '/client/forohfour.html');
        //TODO create 404 html page
        res.send('Four oh four..');
        console.error('Invalid connection|', new Date().toUTCString());
    })
});

// Fetch the encoding for the RATT website URLs from the Database then start scraping
firebase.getRouteEncoding(function () {
    //console.log(firebase.routeEncodings); // debug
    console.log('Started Scrap & Upload routine. (cyclic, performed every 30 seconds)');
    cyclicTask.scrapeUpload30s.run();
});

// Upload the route encodings from the csv generated by running the python script
//firebase.updateRouteEncoding();
// TODO use firebase.updateRouteEncoding when spawning the python script <scripts/HTMLscrapper.py> in a new process as a callback

