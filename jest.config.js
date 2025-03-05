// jest.config.js
module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest",
      "^.+\\.css$": "jest-transform-stub",
    },
    testEnvironment: "jest-environment-jsdom",
    setupFiles: ["./jest.setup.js"], // Add this line
  };
  