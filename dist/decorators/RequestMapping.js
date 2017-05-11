"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _RequestMethod = require("./constans/RequestMethod");

var _RequestMethod2 = _interopRequireDefault(_RequestMethod);

var _RequestWrapper = require("./wrappers/RequestWrapper");

var _RequestWrapper2 = _interopRequireDefault(_RequestWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getExtendParams = params => {
    const baseParams = {
        method: _RequestMethod2.default.GET
    };

    if (Array.isArray(params) || _lodash2.default.isString(params)) {
        return Object.assign(baseParams, {
            value: Array.isArray(params) ? params : [params]
        });
    }

    if (_lodash2.default.isObject(params)) {
        params.value = Array.isArray(params.value) ? params.value : [params.value];
    }

    return params;
};

exports.default = params => {
    params = getExtendParams(params);

    return (target, key, descriptor) => {
        descriptor.value.__requestWrapper = new _RequestWrapper2.default(params, descriptor.value);

        return descriptor;
    };
};
//# sourceMappingURL=RequestMapping.js.map