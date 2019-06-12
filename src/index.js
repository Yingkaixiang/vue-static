import Vue from "vue";

import App from "./views/App.vue";

import "normalize.css";
import "./global.less";

Vue.config.errorHandler = function() {};

new Vue({
  el: "#app",
  render: h => h(App),
});
