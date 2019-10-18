import { IAnyKey } from "../typings";
import { isObject } from "util";

export const updateState = (data: IAnyKey, pathArr: string[], replaceState: any) => {
    const rootState = { ...data }
    let currentState = rootState;
    for (let i = 0; i < pathArr.length - 1; i++) {
        if( !currentState[pathArr[i]!] ) return null;
        currentState[pathArr[i]!] = { ...currentState[pathArr[i]!] };
        currentState = currentState[pathArr[i]!];
    }
    // const changeState = currentState[pathArr[pathArr.length - 1]];
    if(isObject(currentState[pathArr.length - 1])) {
        currentState[pathArr[pathArr.length - 1]] = {
            ...currentState[pathArr[pathArr.length - 1]],
            ...replaceState
        }
    } else {
        currentState[pathArr[pathArr.length - 1]] = replaceState;
    };
    return rootState;
}