import { IAnyKey } from "./typings";
import { isObject, isUndefined } from "util";
import { objFindValueByPath, throwError } from "./utils";

export const updateState = (data: IAnyKey, pathArr: string[], replaceState?: any) => {
    pathArr = [...pathArr];
    const rootState = { ...data }
    const lastKey = pathArr.pop();
    let currentState = objFindValueByPath(rootState, pathArr);
    if(!lastKey){
        if(isObject(replaceState)) return { 
            ...rootState,
            ...replaceState
        }
        return throwError("root state must be a Object");
    }
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