import { IModules, IAnyKey } from "./typings";
import { splitPath, throwError, objFindValueByPath } from "./utils";
import { updateState } from "./data";

export const findModule = (parentModule: IModules, pathArr: string[]): (IModules | null) => {
    
    return objFindValueByPath(parentModule, pathArr, (val,key)=>{
        return val.modules && val.modules[key] ? val.modules[key] : null
    })
}

export const collectModuleState = (module: IModules) => {
    const modulesData: IAnyKey = {};
    module.modules && Object.entries(module.modules).forEach(val => {
        modulesData[val[0]] = collectModuleState(val[1]);
    })
    return {
        ...module.state,
        ...modulesData
    }
}

export const injectModule = (path: string, name: string, module: IModules, rootModule: IModules, state: IAnyKey) => {
    const pathArr = splitPath(path);
    const parentModule = findModule(rootModule, pathArr);
    if (!parentModule) return throwError(`${path} is't avalible path`);
    parentModule.modules = parentModule.modules ? {
        ...parentModule.modules,
        [name]: module
    } : {
        [name]: module
    }
    return updateState(state, [...pathArr, name], module.state);
}

export const distoryModule = (path: string, rootModule: IModules, state: IAnyKey) => {
    const pathArr = splitPath(path);
    const deleteModuleName = pathArr.pop();
    const perentModule = findModule(rootModule, pathArr);
    
    if (!perentModule) return throwError(`can't find parent module that ${path}`);
    if (!perentModule.modules || !perentModule.modules[deleteModuleName!]) return throwError(`${path} module has't ${deleteModuleName} module`);
    delete perentModule.modules[deleteModuleName!];
    return updateState(state, [...pathArr, deleteModuleName!])
}