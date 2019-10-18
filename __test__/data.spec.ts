import { updateState } from "../src/data";
import { resultState } from "./testData";
describe("data", ()=>{
    const replaceb = {
        a: 2,
        c: 3
    }
    test("update state",()=>{
        expect(updateState(resultState, ["ModuleA", "ModuleB"], replaceb)!.ModuleA!.ModuleB).toEqual(replaceb)
        expect(updateState(resultState, ["Module", "ModuleB"], replaceb)).toBe(null)
    })
})