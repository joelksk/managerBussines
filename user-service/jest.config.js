export default {
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/test'],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
};