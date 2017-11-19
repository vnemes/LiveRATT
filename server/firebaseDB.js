var admin = require('firebase-admin');
var fs = require('fs');
var config = require('./config/config');

var exports = module.exports = {};

// Fetch the service account key JSON file contents
var serviceAccount = require("./config/FirebasePrivateKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://liveratt-7cfb2.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

// Upload the route with currentSelectionChild <routeID> to the firebase database
exports.updateRouteSchedule = function (routeID, route) {
    ref = db.ref("routes/" + routeID);
    ref.update(route);
};


// Upload the route encoding from the csv generated by the python script
exports.updateRouteEncoding = function () {
    ref = db.ref("encoding");
    var ret = {};
    fs.readFile(config.routeEncodingPath, function read(err, data) {
        if (err)
            throw err;
        rows = data.toString().split(/\r?\n/);
        rows.forEach(function (v) {
            if (!v.trim() || v.indexOf('test') > -1)
                return 'continue';
            values = v.split(/\ ,\ /);
            if (values[1][0] > 'M' || values[1][values[1].length - 1] >= 'a')
                return 'continue';
            ret[values[1]] = values[0];
            //console.log(values[1],"->",values[0]); //debug
        });
        if (ret) {
            // console.log(ret);
            console.log('Uploaded route encodings to Firebase');
            ref.set(ret);
        }
    });
};

// Receive the encoding from the firebase Database
exports.getRouteEncoding = function (signalDataReady) {
    ref = db.ref("encoding");
    ref.on("value", function (snapshot) {
        //console.log(snapshot.val()); // debug
        exports.routeEncodings = snapshot.val();
        signalDataReady();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        throw errorObject.code;
    });
};

