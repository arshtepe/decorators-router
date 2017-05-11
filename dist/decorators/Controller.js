"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Controller = require("./wrappers/Controller");

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = rootPath => {
    return wrapClass => new _Controller2.default(wrapClass, rootPath);
};
//# sourceMappingURL=Controller.js.map