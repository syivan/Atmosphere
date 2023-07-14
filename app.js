var express = require("express");
var path = require("path");
const request = require('request');
var app = express();


app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));

app.get('', async function (req, res) {
    res.status(200);
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(3000, function () {
    console.log("API version 1.0.0 is running on port 3000");
});