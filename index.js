const _ = require("lodash");

module.exports.router = require("./dist/router").default;

const decorators = require("./dist/decorators/index");
_.keys(decorators).forEach(key => {

    module.exports[key] = decorators[key];
});

