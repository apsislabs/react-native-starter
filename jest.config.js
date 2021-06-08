// jest.config.js

const esModules = ['react-native-iphone-x-helper'].join('|');

module.exports = {
  preset: 'react-native',
  transform: {
    [`(${esModules}).+\\.js$`]: 'ts-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  setupFiles: ['<rootDir>/jest/setup.ts'],
};
