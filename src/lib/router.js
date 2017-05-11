import recursive from "recursive-readdir";
import Controller from "./decorators/wrappers/Controller";
import path from "path";
import {RequestMethod} from "./decorators/index";


export default async(router, controllersFolder) => {
    controllersFolder = Array.isArray(controllersFolder) ? controllersFolder: [controllersFolder];
    return new Promise((resolve) => {
        controllersFolder.forEach(controllersFolder => {
            recursive(controllersFolder, (err, files) => {
                files = files.filter((file) => path.extname(file) === ".js");

                files.forEach(file => {
                    const controller = require(file).default;
                    if (!(controller instanceof Controller)) {
                        return;
                    }

                    controller.handlers.forEach(handler => {
                        const method = handler.method;
                        let requestKeys = Object.keys(RequestMethod);
                        if (method === RequestMethod.ALL) {
                            requestKeys = requestKeys.filter(key => RequestMethod[key] !== RequestMethod.ALL);
                        }
                        requestKeys.forEach(key => {
                            if (method === RequestMethod[key] || method === RequestMethod.ALL) {
                                router[key.toLowerCase()](handler.path[0], handler.callback)
                            }
                        });
                    });
                    resolve();
                });
            });
        });
    });
};