import Vue from "vue";
import Vuex from "vuex";

import App from "./views/App.vue";

import "normalize.css";
import "./global.less";

Vue.config.errorHandler = function() {};

Vue.use(Vuex);

export default function createApp() {
  const app = new Vue({
    render: h => h(App),
  });
  return { app };
}
