# Vue 静态化

## git commit 规范

```bash
yarn add commitizen --dev

# 初始化规范
# 经常初始化失败
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

## 代码规范

### 第一步 安装依赖

```bash
yarn add eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue prettier babel-eslint --dev
```

### 第二步 安装 VSCode 插件

* Vetur
* ESLint
* Prettier

### 第三步 设置 VSCode

```json
// .vscode/settings.json
{
  "prettier.eslintIntegration": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    },
  ]
}
```

## 移动端调试

whistle

## 单元测试

```bash
yarn add jest @vue/test-utils vue-jest babel-jest 'babel-core@^7.0.0-0' @babel/core regenerator-runtime --dev
```

```json
// package.json
{
  // ...
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "vue"
    ],
    "transform": {
      ".*\\.(vue)$": "vue-jest",
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }
}
```
