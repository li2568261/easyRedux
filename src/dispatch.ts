import { IDeliverDispath, IAnyKeyAndCall } from "./typings";
import { Dispatch, AnyAction } from "redux";

export const initRootDispath = (dispatch: Dispatch)=>{
    const rootDispath: IDeliverDispath = (action: AnyAction) => {
        return dispatch(action)
    }
    rootDispath.__path = "";
    rootDispath.__rootDispath = rootDispath;
    return rootDispath;
}

const generateNewDispatch = (dispatch: IDeliverDispath, type: string)=>{
    const deliverDispatch: IDeliverDispath = (payload: any) => {
        return dispatch.__rootDispath({
            type: deliverDispatch.__path,
            payload
        })
    }
    deliverDispatch.__rootDispath = dispatch.__rootDispath;
    deliverDispatch.__path = `${dispatch.__path}/${type}`;
    return deliverDispatch;
}
export const generateProxyDispatch: (dispatch: IDeliverDispath) => IDeliverDispath = ((dispatch: IDeliverDispath) => {
    return new Proxy(dispatch, {
        get: (target: any, type: string, receiver: any) => {
            return dispatch[type] || generateProxyDispatch(generateNewDispatch(dispatch, type));
        }
    })
})