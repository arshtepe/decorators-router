"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _recursiveReaddir = require("recursive-readdir");

var _recursiveReaddir2 = _interopRequireDefault(_recursiveReaddir);

var _Controller = require("./decorators/wrappers/Controller");

var _Controller2 = _interopRequireDefault(_Controller);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _index = require("./decorators/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (router, controllersFolder) => {
    controllersFolder = Array.isArray(controllersFolder) ? controllersFolder : [controllersFolder];
    return new Promise(resolve => {
        controllersFolder.forEach(controllersFolder => {
            (0, _recursiveReaddir2.default)(controllersFolder, (err, files) => {
                files = files.filter(file => _path2.default.extname(file) === ".js");

                files.forEach(file => {
                    const controller = require(file).default;
                    if (!(controller instanceof _Controller2.default)) {
                        return;
                    }

                    controller.handlers.forEach(handler => {
                        const method = handler.method;
                        let requestKeys = Object.keys(_index.RequestMethod);
                        if (method === _index.RequestMethod.ALL) {
                            requestKeys = requestKeys.filter(key => _index.RequestMethod[key] !== _index.RequestMethod.ALL);
                        }
                        requestKeys.forEach(key => {
                            if (method === _index.RequestMethod[key] || method === _index.RequestMethod.ALL) {
                                router[key.toLowerCase()](handler.path[0], handler.callback);
                            }
                        });
                    });
                    resolve();
                });
            });
        });
    });
};
//# sourceMappingURL=router.js.map