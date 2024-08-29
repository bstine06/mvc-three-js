module.exports = {
  testEnvironment: 'node', // You can use 'jsdom' for browser-like testing if needed
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
