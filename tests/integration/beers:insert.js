var BPromise = require("bluebird");
var express  = require("express");
var request  = require("supertest-as-promised");

var mwInit = require("mw-init");

var st = require("../st.js");

var mongoUrl = "mongodb://localhost:27017/beers-tests";

describe("Integration suite - remote method beers:insert", function () {

    var db;
    before(function () {
        return st.setup().then(function (dbConnection) {
            db = dbConnection;
        });
    });
    after(function () {
        return st.teardown(db);
    });

    it("should 401 if the user is not logged in", function () {
        return mwInit(mongoUrl)
            .then(function (mw) {
                var app = express().use("/", mw.getRouter());
                return request(app)
                    .post("/")
                    .send({method: "beers:insert", params: [{}]})
                    .expect("Content-Type", /json/)
                    .expect(401)
                    .expect({error: "Login required"});
            });
    });

});
