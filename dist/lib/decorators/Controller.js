import Controller from "./wrappers/Controller";

export default (rootPath => {
    return wrapClass => new Controller(wrapClass, rootPath);
});
//# sourceMappingURL=Controller.js.map