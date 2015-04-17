var BPromise = require("bluebird");
var jdp      = require("jsondiffpatch");
var MW       = require("meteor-wapi");
var uuid     = require("node-uuid");
var t        = require("tcomb-validation");

var BeerType = require("./lib/beer-type.js");
var ensure   = require("./lib/ensure.js");

var validateBeer = function (beer) {
    ensure(
        new MW.Error(400, "Beer doesn't match the schema"),
        t.validate(beer, BeerType).isValid()
    );
    return beer;
};

exports.insert = function insert (beer) {
    return BPromise.bind(this)
        .then(R.partial(validateBeer, beer))
        .then(function () {
            beer._id = uuid.v4();
            return this.beers.insert(beer);
        });
};

exports.update = function update (beerId, delta) {
    return BPromise.bind(this)
        .then(function () {
            return this.beers.findOne({
                _id: beerId
            });
        })
        .then(function (beer) {
            ensure(
                new MW.Error(404, "Beer not found"),
                !R.isNil(beer)
            );
            return beer;
        })
        .then(function (beer) {
            try {
                return jdp.patch(beer, delta);
            } catch (e) {
                throw new MW.Error(400, "Malformed delta");
            }
        })
        .then(validateBeer)
        .then(function (beer) {
            return this.beers.update({
                _id: beerId
            }, {
                $set: R.omit("_id", beer)
            });
        });
};

exports.remove = function remove (beerId) {
    return exports.update(
        beerId,
        jdp.diff({}, {isDeleted: true})
    );
};
