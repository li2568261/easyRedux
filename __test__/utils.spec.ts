import { splitPath, objFindValueByPath } from "../src/utils";


const result = ["a", "b", "c"];
const splitTestCase = [
    {
        case: "/a/b/c",
        result
    },
    {
        case: "a/b/c",
        result
    },
    {
        case: "a/b/c/",
        result
    },
    {
        case: "a/b/c/",
        result
    },
    {
        case: "/a/b/c/",
        result
    },
    {
        case: "a",
        result: ["a"]
    }
]
describe("utils testing...", () => {
    // splitTestCase.forEach(val => {
    //     test(`splitPath: ${val}`, () => {
    //         expect(splitPath(val.case)).toEqual(val.result);
    //     })
    // })
    test("find", () => {
        const testobj = { a: { b: { c: 1 } } }
        expect(objFindValueByPath(testobj, ["a", "b", "c"])).toBe(1)
    })
})

