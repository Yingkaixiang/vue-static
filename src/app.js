import Vue from "vue";

import App from "./views/App.vue";
import { createStore } from "./store/";

import "normalize.css";
import "./global.less";

console.log(
  `%c当前环境：${process.env.NODE_ENV} + ${process.env.VUE_ENV}`,
  "color: #42c02e",
);

export default function createApp() {
  const store = createStore();

  const app = new Vue({
    store,
    render: h => h(App),
  });
  return { app, store };
}
