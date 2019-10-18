import easyRedux from "../src";
import { testData, resultState } from "./testData";
const { store } = easyRedux(testData);

describe("main test...", () => {
    test("init test", () => {
        const state = store.getState();
        expect(state).toEqual(resultState);
    })
    test("dispatch state...", () => {
        store.dispatch.loading(true);
        let state = store.getState();
        expect(state.loading).toBe(true);
    })
    test("dispatch reducer...", () => {
        let state = store.getState();
        const beforeModuleC = state.ModuleA.ModuleC;
        const setData = {
            a: 2,
            b: "1",
        }
        store.dispatch.ModuleA.ModuleC.MCReducer(setData);
        state = store.getState();
        expect(state.ModuleA.ModuleC).toEqual({
            ...beforeModuleC.equel,
            ...setData
        })
    })
    test("dispatch effect...", async () => {
        await expect(store.dispatch.ModuleA.mockA()).resolves.toEqual("lee");
        await store.dispatch.ModuleA.ModuleC.mockA("c");
        let state = store.getState();
        await expect(state.ModuleA.ModuleC.a).toEqual("c");
        await store.dispatch.ModuleA.mockB("b");
        state = store.getState();
        await expect(state.ModuleA.b).toEqual("b");

        await store.dispatch.ModuleB.mockB("k")
        state = store.getState();
        await expect(state.ModuleB.b).toEqual("k");
    })
})

