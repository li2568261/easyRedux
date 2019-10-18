import { IModules, IAnyKey } from "../typings";

export const findModule = (rootModule: IModules, pathArr: string[]): (IModules|null) => {
    // console.log(rootModule, pathArr)
    if(!rootModule.modules || !rootModule.modules[pathArr[0]!]) {
        return null;
    }
    if(pathArr.length === 1) return rootModule.modules![pathArr[0]!]
    return findModule(rootModule.modules![pathArr[0]!], pathArr.slice(1));
}

export const collectModuleState = (module: IModules)=>{
    const modulesData:IAnyKey = {};
    module.modules && Object.entries(module.modules).forEach(val=>{
        modulesData[val[0]] = collectModuleState(val[1]);
    })
    return {
        ...module.state,
        ...modulesData
    }
}