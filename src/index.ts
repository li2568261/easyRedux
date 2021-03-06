import { createStore, applyMiddleware, Reducer, Middleware } from "redux";
import { IModules, AnyAction, IPlugin, IAnyKey } from "./typings";
import { splitPath, throwError } from "./utils";
import { generateProxyDispatch, initRootDispath } from "./dispatch";
import { updateState } from "./data";
import { findModule, collectModuleState, injectModule, distoryModule } from "./module";
import { isUndefined } from "util";
import { refreshStateType } from "./shared";

export default (entryModule: IModules, plugins?: IPlugin[]) => {
    let _state: IAnyKey = collectModuleState(entryModule);
    const _modules: IModules = entryModule;
    const enhancher: Middleware = (store) => {

        return next => {

            const runReducerNext = (pathArr: string[], payload: any, action: AnyAction) => {
                const result = updateState(_state, pathArr, payload);
                if (!result) return throwError(`can't find module: ${pathArr}`);
                _state = result;
                return next(action);
            }

            return action => {
                if (action.type === refreshStateType) { return next(action) }
                const pathArr = splitPath(action.type);
                const actionName = pathArr.pop();
                const moduleT = pathArr.length ? findModule(_modules, pathArr) : _modules;
                if (!moduleT) return throwError(`can't find module: ${pathArr}`);

                if (!isUndefined(moduleT.reducer) && !isUndefined(moduleT.reducer[actionName!])) {
                    return runReducerNext(pathArr, moduleT.reducer[actionName!](_state, action.payload), action)
                }

                if (!isUndefined(moduleT.effects) && !isUndefined(moduleT.effects[actionName!])) {
                    const moduleProxy = new Proxy({}, {
                        get(target, props) {
                            return (payload: any) => {
                                return rootDispath({
                                    type: [...pathArr, props].join("/"),
                                    payload
                                })
                            }
                        }
                    })
                    return moduleT.effects[actionName!].call(moduleProxy, action.payload, _state, rootDispath, _state)
                }
                if (!isUndefined(moduleT.state[actionName!])) return runReducerNext([...pathArr, actionName!], action.payload, action)
                throwError(`This action name: ${actionName}, Is not in one of reducer/effect/state on the module:${pathArr.join("/")}`);
            }

        }
    }
    // modules.
    const _reducer: Reducer = (action?: AnyAction) => {
        return _state;
    };

    const store = createStore(_reducer, _state, applyMiddleware(enhancher));
    const rootDispath = generateProxyDispatch(initRootDispath(store.dispatch));
    const refreshState = ()=>rootDispath({
        type: refreshStateType
    })
    const withStateSet = (fc: any)=>{
        return (...arg: any[])=>{
            const result = fc(...arg, _modules, _state);
            if (!result) return throwError("inject module error");
            _state = result;
            refreshState();
            return true;
        }
    }
    const inject = withStateSet(injectModule);
    const distory = withStateSet(distoryModule);
    return {
        store: {
            ...store,
            dispatch: rootDispath
        },
        inject,
        distory
    }
}