var R = require("ramda");

module.exports = R.curry(function (error, condition) {
    if (!condition) {
        throw error;
    }
});
