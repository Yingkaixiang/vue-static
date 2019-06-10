module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "eslint-config-prettier",
    "plugin:vue/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    // 支持的 JS 的语法版本
    ecmaVersion: 2018,
    parser: "babel-eslint",
  },
  plugins: ["prettier"],
  rules: {
    "no-irregular-whitespace": "off",
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        tabWidth: 2,
        semi: true,
        trailingComma: "all",
        endOfLine: "auto",
      },
    ],
    "vue/attributes-order": "off",
    "vue/html-self-closing": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": "off",
  },
};
