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
    "^node-fetch$": "<rootDir>/src/test/mock/node-fetch.ts",
    // Development: use local TypeScript source (same as webpack and tsconfig)
    "^@altimateai/dbt-integration$":
      "<rootDir>/../altimate-dbt-integration/src/index.ts",
    // Production: use npm package (commented out for development)
    // "^@altimateai/dbt-integration$": "@altimateai/dbt-integration",
  },
};
