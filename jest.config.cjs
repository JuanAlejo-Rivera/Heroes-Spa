module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['/node_modules/(?!nombre-del-paquete-a-transformar).+\\.js$',],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',  // Transformar archivos .js y .jsx usando babel-jest
      },
      transformIgnorePatterns: [
        '/node_modules/(?!query-string).+\\.js$'  // Asegúrate de transformar 'query-string'
      ],
}