var MW = require("meteor-wapi");
var R  = require("ramda");

var ensure = require("./ensure.js");

module.exports = function ensureUserHasRole (role) {
    ensure(
        new MW.Error(403, "You don't have the necessary role to perform this action"),
        R.contains(role, this.user.roles)
    );
};
