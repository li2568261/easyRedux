import { IModules } from "../../src/typings";

export const resultState = {
    loading: false,
    ModuleA: {
        a: 1,
        b: "a",
        c: "c",
        ModuleC: {
            a: 1,
            b: "a",
            c: "c"
        }
    },
    ModuleB: {
        a: 1,
        b: "b",
        c: "c"
    }

}
export const ModuleC: IModules = {
    state: {
        a: 1,
        b: "a",
        c: "c"
    },
    reducer: {
        MCReducer: (state, payload) => {
            return payload
        }
    },
    effects: {
        mockA: async (payload, state, dispatch, store) => {
            return Promise.resolve(payload).then((payload) => {
                dispatch.ModuleA.ModuleC.a(payload)
            });
        },
        mockB: async (payload, state, dispatch, store) => {
            return Promise.resolve(8).then(dispatch.ModuleA.ModuleC.b);
        }
    }
}
export const ModuleA: IModules = {
    state: {
        a: 1,
        b: "a",
        c: "c"
    },
    effects: {
        mockA: async (payload, state, dispatch, store) => {
            return Promise.resolve(payload).then(data => {
                dispatch.ModuleA.a(payload)
                return "lee";
            });
        },
        mockB: async (payload, state, dispatch, store) => {
            return Promise.resolve(payload).then(dispatch.ModuleA.b);
        }
    },
    modules: {
        ModuleC
    }
}

const ModuleB: IModules = {
    state: {
        a: 1,
        b: "b",
        c: "c"
    },
    effects: {
        mockA: async (payload, state, dispatch, store) => {
            return Promise.resolve(1).then(dispatch.ModuleB.a);
        },
        mockB: async function (payload, state, dispatch, store) {
            return Promise.resolve(payload).then(this.b)
        }
    }
}
export const testData = {
    state: {
        loading: false
    },
    modules: {
        ModuleA,
        ModuleB
    }
}

export const injectModule = {
    state: {
        x: 1
    },
    effects: {
        iMock: async () => { }
    }
}