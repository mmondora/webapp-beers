var express = require("express");

var mwInit = require("./mw-init.js");

var mongoUrl = process.env.MONGO_URL || "mongodb://localhost:3001/meteor";
var port     = process.env.PORT || 4000;

mwInit(mongoUrl)
    .then(function (mw) {
        express()
            .post("/call", mw.getRouter())
            .listen(port);
    });
