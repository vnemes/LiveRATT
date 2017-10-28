const express = require('express');
const app = express();
const config = require('./config/config.js');
var scrapper = require('./scraper');

app.listen(config.APP_PORT, function(){
    console.log('Successfully listening on port ' + config.APP_PORT);
    app.get('/', function(req, res)  {
        res.sendfile(__dirname + '/mapper/getMap.html');
        console.log('Got a connection');
    });
    app.get('*', function(req, res)  {
        //res.sendfile(__dirname + '/client/forohfour.html');
        //TODO create 404 html page
        res.send('Four oh four..');
        console.error('Invalid connection');
    })
});
scrapper.getBusSchedule(1556, function(out){ // debug
    console.log(JSON.stringify(out, null, 4)); // debug output
});

var firebase = require('./firebaseDB');
firebase.test;
