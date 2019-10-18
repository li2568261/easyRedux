import { initRootDispath, generateProxyDispatch } from "../src/dispatch";
import { Dispatch, AnyAction } from "redux";

describe("dispath testing", () => {
    const dispatch: Dispatch<AnyAction> = action => {
        return action
    }
    const rootDispath = initRootDispath(dispatch);
    const proxyDispath = generateProxyDispatch(rootDispath);
    test("dispath", () => {
        expect(proxyDispath.a.b("hello")).toEqual({ type: '/a/b', payload: 'hello' })
        expect(proxyDispath({
            type: "/a/b",
            payload: "hello"
        })).toEqual({ type: '/a/b', payload: 'hello' })
    })

})