var BPromise = require("bluebird");
var R        = require("ramda");

var ensureLogin       = require("./lib/ensure-login.js");
var ensureOwnsBrewery = require("./lib/ensure-owns-brewery.js");
var beers             = require("./beers.js");

exports["beers:insert"] = function (beer) {
    return BPromise.bind(this)
        .then(ensureLogin)
        //.then(ensureUserHasRole("brewery-manager"))
        .then(R.partial(ensureOwnsBrewery, beer))
        .then(R.partial(beers.insert, beer))
        .then(R.always(null));
};

exports["beers:update"] = function (beerId, delta) {
    return BPromise.bind(this)
        .then(ensureLogin)
        //.then(ensureUserHasRole("brewery-manager"))
        .then(R.partial(ensureOwnsBrewery, beerId))
        .then(R.partial(beers.update, beerId, delta))
        .then(R.always(null));
};

exports["beers:remove"] = function (cardId) {
    return BPromise.bind(this)
        .then(ensureLogin)
        //.then(ensureUserHasRole("brewery-manager"))
        .then(R.partial(ensureOwnsBrewery, beerId))
        .then(R.partial(beers.remove, beerId))
        .then(R.always(null));
};
