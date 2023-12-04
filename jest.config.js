module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    }
  };
  