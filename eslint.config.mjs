import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {rules: {
    // Disable all non-critical linting rules
    "no-console": "off", // Allow console.log statements
    "no-unused-vars": "off", // Allow unused variables (no warnings)
    "no-empty-function": "off", // Allow empty functions
    "no-debugger": "off", // Allow debugger statements
    "react/prop-types": "off", // Disable prop-type checks
    "react/jsx-uses-react": "off", // React 17+ no longer requires React import
    "react/react-in-jsx-scope": "off", // React 17+ no longer requires React in scope
    "react/jsx-pascal-case": "off", // Don't care about PascalCase for components
    "eqeqeq": "off", // Don't enforce strict equality
    "no-restricted-syntax": "off", // No restrictions on syntax (e.g., 'with' statement)
    "no-extra-boolean-cast": "off", // Allow redundant boolean casts
  }},
];
