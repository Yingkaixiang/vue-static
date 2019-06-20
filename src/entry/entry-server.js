import createApp from "../app";

export default context => {
  const { app, store } = createApp();
  store.commit("setState", context.state);
  return app;
};
