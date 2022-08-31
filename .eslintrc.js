module.exports = {
  extends: [
    "airbnb",
    "prettier",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "next/core-web-vitals",
    "next",
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2015,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    // Keep this as warn, we do not want to leak console logs.
    // into the production build.
    "no-console": "warn",
    // Previously, it was set to error, but that was too strict.
    "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    // Avoid prop spreading, see https://aurelio.me/blog/Why-I-stopped-spreading-props-react/
    "react/jsx-props-no-spreading": "warn",
    // Just no.
    "react/function-component-definition": "off",
    // Although we prefer default exports, we do not want to force it.
    "import/prefer-default-export": "warn",
    "react/require-default-props": "off",
    "no-plusplus": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-unresolved": ["error", { caseSensitive: false }],
    "jsx-a11y/click-events-have-key-events": "off", // temporarily disabled.
    // According to MDN, https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
    // By default, if no tabIndex is specified, it will be 0.
    "jsx-a11y/interactive-supports-focus": "off",
    // According to the solution from this post, https://stackoverflow.com/questions/69687167/proptype-name-is-not-required-but-has-no-corresponding-defaultprops-declarati,
    // it was suggested that this rule should be disabled for the passed in 'state' argument in redux toolkit slices.
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state"],
      },
    ],
    // Disable this as file names are named in all lower case, spaced by dashes ('-').
    "import/no-named-as-default": "off",
    // "max-lines": ["warn", { max: 150, skipBlankLines: true }],
    // Although this is good to do, it is annoying having to change an arrow function
    // to a function that isn't a pure return.
    "arrow-body-style": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
  },
};
