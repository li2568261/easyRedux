export const splitPath = (path: string)=>path.replace(/^\/|\/$/g, "").split("/");

export const throwError = (mess: string)=>{throw new Error(mess)};

export const isObject = (obj: any)=>Object.prototype.toString.call(obj) === "[object Object]";

export const isUndefined = (val: any)=>typeof val === 'undefined';

const selectFc = (obj: any, key: string)=>{
    return obj[key]
}
export const objFindValueByPath = (obj: any,path: string[], fc = selectFc)=>{
    if(!isObject(obj))return null;
    if(path.length === 0)return obj;
    let currentObj = obj;
    for(let i = 0; i < path.length - 1; i++){
        currentObj = fc(currentObj, path[i]);
        if(!isObject(currentObj))return null;
    }

    return fc(currentObj, path[path.length - 1]);
}