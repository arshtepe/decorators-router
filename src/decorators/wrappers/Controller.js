import RequestWrapper from "../wrappers/RequestWrapper";

const _buildHandlers = Symbol();
const _handlers = Symbol();

export default class Controller {
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
            if (!(wrap instanceof RequestWrapper)) {
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