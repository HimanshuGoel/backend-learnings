module.exports = {
    preset: 'ts-jest',
    roots: [
        "./src"
    ],
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
};