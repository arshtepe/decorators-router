import _ from "lodash";
import RequestMethod from "./constans/RequestMethod";
import RequestWrapper from "./wrappers/RequestWrapper";

const getExtendParams = params => {
    const baseParams = {
        method: RequestMethod.GET
    };

    if(Array.isArray(params) || _.isString(params)) {
        return Object.assign(baseParams, {
            value: Array.isArray(params) ? params : [params]
        });
    }

    if(_.isObject(params)) {
        params.value = Array.isArray(params.value) ? params.value : [params.value];
    }

    return params;
};

export default params => {
    params = getExtendParams(params);

    return (target, key, descriptor) => {
        descriptor.value.__requestWrapper = new RequestWrapper(params, descriptor.value);

        return descriptor;
    };
};
