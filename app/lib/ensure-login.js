var MW = require("meteor-wapi");

var ensure = require("./ensure.js");

module.exports = function ensureLogin (userId) {
    ensure(
        new MW.Error(401, "Login required"),
        this.userId !== null
    );
};
