var express = require("express");
var path = require("path");
var app = express();

app.get('/', function (req, res) {
    res.status(200);
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/weather', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html/'));
});

app.listen(3000, function () {
    console.log("API version 1.0.0 is running on port 3000");
});