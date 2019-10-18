import { IAnyKey } from "../typings";
import { isObject, isUndefined } from "util";
import { objFindValueByPath } from "./utils";

export const updateState = (data: IAnyKey, pathArr: string[], replaceState?: any) => {
    
    const rootState = { ...data }
    let currentState = objFindValueByPath(rootState, pathArr.slice(0, -1));
    const lastKey = pathArr[pathArr.length - 1];
    if(isUndefined(replaceState)){
        delete currentState[lastKey];
    }else if(isObject(currentState[lastKey])) {
        currentState[lastKey] = {
            ...currentState[lastKey],
            ...replaceState
        }
    } else {
        currentState[lastKey] = replaceState;
    };
    return rootState;
}