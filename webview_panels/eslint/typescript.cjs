module.exports = {
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/explicit-module-boundary-types": "warn", // on because it's good
  "@typescript-eslint/indent": "off", // off because https://github.com/typescript-eslint/typescript-eslint/issues/1824
  "@typescript-eslint/no-shadow": "warn", // on because it's good
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "variable",
      format: ["camelCase", "PascalCase", "UPPER_CASE"],
      filter: {
        regex: "_id",
        match: false,
      },
    },
    {
      selector: "function",
      format: ["camelCase"],
    },
    {
      selector: "typeLike",
      format: ["PascalCase"],
    },
  ],
  "@typescript-eslint/no-loop-func": "warn", // on because it's good
  "@typescript-eslint/no-inferrable-types": "warn", // on because it's good
  "@typescript-eslint/no-var-requires": "off", // allow top level require,
  "@typescript-eslint/no-misused-promises": [
    "error",
    {
      checksVoidReturn: false,
    },
  ],
  "@typescript-eslint/ban-types": [
    "warn",
    {
      types: {
        "React.FC": {
          message:
            "React.FC is problematic. [More info here](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript)",
        },
        "React.FunctionalComponent": {
          message:
            "React.FunctionalComponent is problematic. [More info here](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript)",
        },
        "React.VFC": {
          message:
            "React.VFC is problematic. [More info here](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript)",
        },
        "React.VoidFunctionComponent": {
          message:
            "React.VoidFunctionComponent is problematic. [More info here](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript)",
        },
      },
    },
  ],
  "@typescript-eslint/no-unused-vars": [
    "error",
    { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
  ],
  "typescript-sort-keys/string-enum": ["warn", "asc", { caseSensitive: true }],
};
