import Toast from "./Toast";

let instance = null;
let timer = null;

const ToastPlugin = {
  install(Vue) {
    Vue.prototype.$toast = function(message) {
      const ToastConstructor = Vue.extend(Toast);
      if (!instance) {
        instance = new ToastConstructor({
          el: document.createElement("div"),
          propsData: {
            message
          }
        });
        document.querySelector("body").appendChild(instance.$el);
      } else {
        instance.close();
        clearTimeout(timer);
        instance.message = message;
      }
      Vue.nextTick(() => {
        instance.open();
        timer = setTimeout(() => {
          instance.close();
          clearTimeout(timer);
        }, 3000);
      });
    };
  }
};

export default ToastPlugin;
