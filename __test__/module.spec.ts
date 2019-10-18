import { collectModuleState, findModule } from "../src/module";
import { testData, resultState, ModuleA, ModuleC } from "./testData";


describe("module testing ....", () => {
    test("collectModuleState", () => {
        expect(collectModuleState(testData)).toEqual(resultState);
    })

    test("findModule", () => {
        expect(findModule(testData, ["ModuleA"])).toEqual(ModuleA)
        expect(findModule(testData, ["ModuleA", "ModuleC"])).toEqual(ModuleC)
        expect(findModule(testData, ["ModuleA", "D"])).toBe(null)
    })
})
