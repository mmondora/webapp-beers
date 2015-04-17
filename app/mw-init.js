var BPromise    = require("bluebird");
var express     = require("express");
var MongoClient = require("mongodb").MongoClient;
var MW          = require("meteor-wapi");

var getCollection = require("./lib/get-collection.js");
var methods       = require("./methods.js");

module.exports = function mwInit (mongoUrl) {
    return BPromise.resolve()
        .then(function () {
            return BPromise.promisify(MongoClient.connect, MongoClient)(mongoUrl);
        })
        .then(function (db) {
            var mw = new MW(db);
            mw.methods(methods, {
                db: db,
                beers: getCollection(db, "beers")
            });
            return mw;
        });
};
