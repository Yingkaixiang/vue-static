import Vue from "vue";

import App from "./views/App.vue";
import { createStore } from "./store/";

import "normalize.css";
import "./global.less";

export default function createApp() {
  const store = createStore();

  const app = new Vue({
    store,
    render: h => h(App),
  });
  return { app, store };
}
