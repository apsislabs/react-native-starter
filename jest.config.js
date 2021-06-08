// jest.config.js

const esModules = [
  'react-native',
  '@react-native',
  'react-clone-referenced-element',
  '@react-native-community',
  'expo(nent)?',
  '@expo(nent)?/.*',
  'react-navigation',
  '@react-navigation/.*',
  '@unimodules/.*',
  'unimodules',
  'sentry-expo',
  'native-base',
  '@sentry',
].join('|');

module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [`node_modules/(?!(jest-)?${esModules}/.*)`],
  cacheDirectory: '.jest/cache',
  setupFiles: ['<rootDir>/jest/setup.ts'],
};
