export default {
  install(Vue) {
    // eslint-disable-next-line
    Vue.config.globalProperties.$message = function (html) {
      M.toast({ html });
    };
    // eslint-disable-next-line
    Vue.config.globalProperties.$error = function (html) {
      M.toast({ html: `[Error] ${html}` });
    };
  },
};
