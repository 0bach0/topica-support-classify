var express = require("express");
var path = require("path");
var app = require('express')();
var http = require('http').Server(app);


app.use('/', express.static(path.join(__dirname, 'prod')));


var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});


