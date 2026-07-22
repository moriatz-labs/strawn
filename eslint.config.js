import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**", "apps/docs/public/**"] },
  {
    files: ["**/*.mjs", "**/*.js"],
    ...js.configs.recommended,
    languageOptions: { globals: { console: "readonly", fetch: "readonly", process: "readonly", setTimeout: "readonly", URL: "readonly" } },
  },
  ...tseslint.configs.recommended.map((config) => ({ ...config, files: ["**/*.ts", "**/*.tsx"] })),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: { react, "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { document: "readonly", window: "readonly", navigator: "readonly", HTMLElement: "readonly", HTMLButtonElement: "readonly" },
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "error"
    }
  }
);
