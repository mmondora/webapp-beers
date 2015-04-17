var BPromise = require("bluebird");
var MW       = require("meteor-wapi");
var R        = require("ramda");

var ensure = require("./ensure.js");

module.exports = function ensureOwnsBrewery (beerOrBeerId) {
    return BPromise.bind(this)
        .then(function () {
            return (
                R.is(String, beerOrBeerId) ?
                this.beers.findOne({
                    _id: beerOrBeerId
                }) :
                beerOrBeerId
            );
        })
        .then(function (beer) {
            ensure(
                new MW.Error(403, "You don't have permissions for that brewery"),
                this.user.breweryId === beer.breweryId
            );
        });
};
