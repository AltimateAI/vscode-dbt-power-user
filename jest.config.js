module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/test/**",
    "!**/node_modules/**",
  ],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^vscode$": "<rootDir>/src/test/mock/vscode.ts",
    "^@lib$": "<rootDir>/src/test/mock/lib.ts",
  },
};
