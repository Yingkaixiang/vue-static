import Vue from "vue";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

import createApp from "../app";

Sentry.init({
  dsn: "https://f45a653cf5fa460990b6505983923cf9@sentry.io/1486530",
  integrations: [
    new Integrations.Vue({
      Vue,
      attachProps: true,
    }),
  ],
});

const { app, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

app.$mount("#app");

if (module.hot) {
  module.hot.accept();
}
