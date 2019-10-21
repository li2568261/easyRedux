import { IAnyKey } from "./typings";
import { isObject, isUndefined } from "util";
import { objFindValueByPath, throwError } from "./utils";

export const updateState = (data: IAnyKey, pathArr: string[], replaceState?: any) => {
    pathArr = [...pathArr];
    const lastKey = pathArr.pop();
    // let currentState = objFindValueByPath(rootState, pathArr);
    if (!lastKey) {
        if (isObject(replaceState)) return {
            ...data,
            ...replaceState
        }
        return throwError("root state must be a Object");
    }

    const rootState = { ...data };
    let currentState = rootState;
    for (let i = 0; i < pathArr.length; i++) {
        let key = pathArr[i];
        if (!key) continue;
        if (!isObject(currentState[key])) return null;
        currentState[key] = { ...currentState[key] };
        currentState = currentState[key];
    }
    if (isUndefined(replaceState)) {
        delete currentState[lastKey];
    } else if (isObject(currentState[lastKey])) {
        currentState[lastKey] = {
            ...currentState[lastKey],
            ...replaceState
        }
    } else {
        currentState[lastKey] = replaceState;
    };
    return rootState;
}