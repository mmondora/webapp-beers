var t = require("tcomb");

module.exports = t.struct({
    breweryid: t.Str,
    name: t.maybe(t.Str),
    shortdescription: t.maybe(t.Str),
    description: t.maybe(t.Str),
    assets: t.maybe(t.struct({
        pictureurl: t.Str,
        thumbnailurl: t.Str
    })),
    info: t.maybe(t.struct({
        type: t.Str,
        volume: t.Num
    })),
    isDeleted: t.maybe(t.Bool)
});
