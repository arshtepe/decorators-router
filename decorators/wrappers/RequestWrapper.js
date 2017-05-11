"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _params = Symbol();
const _callback = Symbol();

const wrapCallback = function (callback) {
    return async function (ctx, next) {
        const body = await callback(ctx, ctx.request.query);

        if (body !== undefined) {
            ctx.body = body;
        }
    };
};

exports.default = class {
    constructor(params, callback) {
        this[_params] = params;
        this[_callback] = wrapCallback(callback);
    }

    setRootPath(rootPath) {
        this[_params].value = this[_params].value.map(value => _path2.default.join(rootPath, value));
    }

    get path() {
        return this[_params].value;
    }

    get method() {
        return this[_params].method;
    }

    get callback() {
        return this[_callback];
    }

};
//# sourceMappingURL=RequestWrapper.js.map