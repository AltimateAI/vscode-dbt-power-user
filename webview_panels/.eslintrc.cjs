const typescriptRules = require("./eslint/typescript.cjs");

const isPreCommit = process.env.PRE_COMMIT === "true";

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
    "plugin:you-dont-need-lodash-underscore/compatible",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaVersion: "latest",
    extraFileExtensions: [".json"],
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "jest",
    "testing-library",
    "typescript-sort-keys",
    "promise",
    "react-refresh",
  ],
  rules: {
    ...typescriptRules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-console": "error",
    "class-methods-use-this": "off",
    // import
    "import/no-extraneous-dependencies": "off", // off because there are too many false positives
    "import/extensions": "off", // off because having file extensions is unnecessary
    "import/no-default-export": "off",
    "import/prefer-default-export": "off",

    // react
    "react/react-in-jsx-scope": "off", // off because unnecessary for react 17+
    "react/prop-types": "off", // off because it's not able to correctly evaluate TS prop types
    "react/require-default-props": "off", // off because it's not able to correctly evaluate TS prop types
    "react/jsx-no-target-blank": ["error", { allowReferrer: false }], // allowReferrer is disabled because we don't support IE
    "react/jsx-props-no-spreading": "off", // off because prop spreading is useful
    "react/no-unused-prop-types": "warn", // warn because of occasional false positives

    /** next rules require whole codebase TS transpiling */
    "@typescript-eslint/dot-notation": isPreCommit ? "off" : "warn",
    "@typescript-eslint/no-implied-eval": isPreCommit ? "off" : "error",
    "@typescript-eslint/no-throw-literal": isPreCommit ? "off" : "error",
    "@typescript-eslint/return-await": isPreCommit ? "off" : "warn", // Redundant use of `await` on a return value
    "@typescript-eslint/default-param-last": "off", //off because it conflicts with redux
    /** end rules which require whole codebase TS transpiling */

    "no-restricted-exports": "off",
    "no-underscore-dangle": ["error"],
    "no-param-reassign": [
      // ignore 'state' variables for immer mutability in redux-toolkit
      // https://redux-toolkit.js.org/usage/immer-reducers#linting-state-mutations
      "warn",
      {
        props: true,
        ignorePropertyModificationsFor: ["state", "beforeUnloadEvent", "acc"],
      },
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
  },
  overrides: [
    {
      files: ["src/modules/**"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              {
                name: "reactstrap",
                message: "Use `@uicore`",
              },
            ],
            patterns: [],
          },
        ],
      },
    },
  ],
};
