import { updateState } from "../src/data";
import { resultState } from "./testData";
describe("data", () => {
    const replaceb = {
        a: 2,
        c: 3
    }
    test("update state", () => {
        let replaceData = updateState(resultState, ["ModuleA", "ModuleB"], replaceb);
        expect(replaceData!.ModuleA!.ModuleB).toEqual(replaceb);
        replaceData = updateState(resultState, ["ModuleA", "ModuleB"])
        expect(replaceData!.ModuleA!.ModuleB).toBe(undefined)
    })
})