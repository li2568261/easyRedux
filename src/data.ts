import { IAnyKey } from "../typings";
import { isObject, isUndefined } from "util";


const findStateParent = (data: IAnyKey, pathArr: string[])=>{

}
export const updateState = (data: IAnyKey, pathArr: string[], replaceState?: any) => {
    
    const rootState = { ...data }
    let currentState = rootState;
    for (let i = 0; i < pathArr.length - 1; i++) {
        if( isUndefined(currentState[pathArr[i]!]) ) return null;
        currentState[pathArr[i]!] = { ...currentState[pathArr[i]!] };
        currentState = currentState[pathArr[i]!];
    }
    
    if(isUndefined(replaceState)){
        delete currentState[pathArr[pathArr.length - 1]];
    }else if(isObject(currentState[pathArr.length - 1])) {
        currentState[pathArr[pathArr.length - 1]] = {
            ...currentState[pathArr[pathArr.length - 1]],
            ...replaceState
        }
    } else {
        currentState[pathArr[pathArr.length - 1]] = replaceState;
    };
    return rootState;
}