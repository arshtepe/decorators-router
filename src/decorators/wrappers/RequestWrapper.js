const url = require("url");
const _params = Symbol();
const _callback = Symbol();

const wrapCallback = function (callback) {
    return async function (ctx) {
        const body = await callback(ctx, ctx.request.body);//TODO add bodyParser

        if(body !== undefined) {
            ctx.body = body;
        }
    };
};


export default class {
    constructor(params, callback) {
        this[_params] = params;
        this[_callback] = wrapCallback(callback);
    }

    setRootPath(rootPath) {
        this[_params].value = this[_params].value.map(value => url.resolve(rootPath, value));
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

}