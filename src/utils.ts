export const splitPath = (path: string)=>path.replace(/^\/|\/$/g, "").split("/");

export const throwError = (mess: string)=>{throw new Error(mess)};

export const isObject = (obj: any)=>Object.prototype.toString.call(obj) === "[object Object]";

export const isUndefined = (val: any)=>typeof val === 'undefined';