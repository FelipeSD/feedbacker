module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/*.spec.js'],
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@c/(.*)$': '<rootDir>/src/components/$1',
    '^@v/(.*)$': '<rootDir>/src/views/$1',
    '^@a/(.*)$': '<rootDir>/src/assets/$1',
    '^@u/(.*)$': '<rootDir>/src/utils/$1',
    '^@h/(.*)$': '<rootDir>/src/hooks/$1',
    '^@s/(.*)$': '<rootDir>/src/services/$1',
    '^@st/(.*)$': '<rootDir>/src/store/$1'
  }
};
