import createApp from "../app";

export default context => {
  const { app, store } = createApp();
  store.commit("setName", context.state.name);
  return app;
};
