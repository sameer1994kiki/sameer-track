import config from "../config";
import { lazyRequest } from "../utils/request";
import { onBFCacheRestore } from "../utils/utils";
export default function error() {
  const primaryConsoleError = window.console.error;
  window.console.error = (...args) => {
    primaryConsoleError.apply(this, args);
    lazyRequest({
      type: "error",
      subType: "console-error",
      errData: args,
    });
  };
  // 捕获资源加载失败错误 js css img...
  window.addEventListener(
    "error",
    (e) => {
      const target = e.target;
      if (!target) return;
      // 判断是否是资源
      const url = target.src || target.href;
      if (url) {
        lazyRequest({
          type: "error",
          subType: "resource",
          url,
          startTime: e.timeStamp,
          html: target.outerHTML,
          resourceType: target.tagName,
          paths: e.path.map((item) => item.tagName).filter(Boolean),
        });
      }
    },
    true
  );

  window.onerror = (msg, url, line, column, error) => {
    lazyRequest({
      type: "error",
      subType: "js",
      msg,
      url,
      line,
      column,
      error,
    });
  };
  // 监听promise等异步报错，缺点是拿不到列数据
  window.addEventListener("unhandledrejection", (e) => {
    debugger;
    lazyRequest({
      type: "error",
      subType: "promise",
      reason: e.reason?.stack,
    });
  });

  if (config.vue?.Vue) {
    config.vue.Vue.config.errorHandler = (err, vm, info) => {
      console.error(err);
      lazyReportCache({
        subType: "vue",
        type: "error",
        info,
        error: err.stack,
      });
    };
  }
  if (config.react?.React) {
    //
  }
  onBFCacheRestore(() => {
    error();
  });
}
// export default error;
