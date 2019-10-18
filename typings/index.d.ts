import { Dispatch } from "redux"

export type TStateType = {
    [key: string]: any
}

export type AnyAction = {
    type: string,
    payload: any
}
// export interface IDispatch<T = any> {
//     (action: AnyAction): Promise<T>
//     [key: string]: IDispatch<T>
// }
interface IAnyFuc {
    [key: string]: (...arg: any[])=>any
}
export interface IDeliverDispath extends Dispatch {
    (payload: any): void
    __rootDispath: IDeliverDispath
    __path: string
    [key:string]: any
}
export type TEffects<P = any, T = TStateType, D = IDeliverDispath, M = IModules<any>, RT = TStateType> = (this: IAnyFuc,payload: P, state: T, dispatch: D, rootState:RT) => Promise<any>
export interface IModules<stateType = TStateType> {
    namespace?: boolean
    state: stateType
    reducer?: {
        [key: string]: (state: stateType, payload: any) => stateType
    },
    effects?: {
        [key: string]: TEffects<stateType>
    },
    modules?: {
        [key: string]: IModules
    }
}
export interface IPlugin {
    (modules:IModules):IModules
}
export interface IAnyKey{
    [key: string]: any
}
export interface IAnyKeyAndCall extends IAnyKey{
    (...arg: any[]): any
    [key: string]: any
}