
const  all = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__test__/index\\.(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}