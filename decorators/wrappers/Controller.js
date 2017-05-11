"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _RequestWrapper = require("../wrappers/RequestWrapper");

var _RequestWrapper2 = _interopRequireDefault(_RequestWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _buildHandlers = Symbol();
const _handlers = Symbol();

class Controller {
    constructor(WrapClass, rootPath = "/") {
        this[_buildHandlers](WrapClass, rootPath);
    }

    [_buildHandlers](WrapClass, rootPath) {
        const wrapClass = new WrapClass();
        let keys = [];
        let obj = wrapClass;
        this[_handlers] = [];
        do {
            keys = keys.concat(Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));

        keys.forEach(key => {
            let wrap = wrapClass[key].__requestWrapper;
            if (!(wrap instanceof _RequestWrapper2.default)) {
                return;
            }

            wrap.setRootPath(rootPath);
            this[_handlers].push(wrap);
        });
    }

    get handlers() {
        return this[_handlers];
    }
}
exports.default = Controller;
//# sourceMappingURL=Controller.js.map