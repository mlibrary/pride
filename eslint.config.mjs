import globals from "globals";
import pluginJs from "@eslint/js";
import mochaPlugin from "eslint-plugin-mocha";

export default [
  pluginJs.configs.recommended,
  mochaPlugin.configs.flat.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    rules: {
      "arrow-body-style": ["error", "always"], // Requires {} in arrow function body
      "arrow-parens": ["error", "always"], // Requires () around arrow function arguments
      "brace-style": ["error", "1tbs"], // Requires one true brace style
      "no-empty-function": "error", // Require an empty function to at least have a comment explaining why
      "no-var": "error", // Discourages using `var` and recommends using `let` or `const` instead
      "semi": ["error", "always"] // Requires a semicolon wherever necessary
    }
  },
  {
    files: ["spec/**/*.spec.js"],
    rules: {
      "mocha/no-exclusive-tests": "off", // Alow use of `.only` to run specific tests
      "mocha/no-exports": "off", // Allow exports, such as `siblingFileIsProperty` to reduce repeated code
      "mocha/no-setup-in-describe": "off", // Allows functions to be called inside `describe` blocks to reduce repeated code
      "mocha/no-skipped-tests": "off", // Remove this rule when `./spec/Pride/Util/RequestBuffer.spec.js` is rebuilt and passing
      "mocha/no-top-level-hooks": "off" // Allows functions to use 'before'/'after' hooks to reduce repeated code
    }
  }
];
