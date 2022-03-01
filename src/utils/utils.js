export const deepClone = (target) => {
  if (typeof target === "object") {
    const result = Array.isArray(target) ? [] : {};
    for (const key in target) {
      if (typeof target[key] == "object") {
        result[key] = deepCopy(target[key]);
      } else {
        result[key] = target[key];
      }
    }

    return result;
  }

  return target;
};

export const getUuid = () => {
  return `v1-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};

export const onBeforeunload = (cb) => {
  window.addEventListener("beforeunload", cb, true);
};

export const onHidden = (cb, once) => {
  const onHiddenOrPageHide = (event) => {
    if (event.type === "pagehide" || document.visibilityState === "hidden") {
      cb(event);
      if (once) {
        window.removeEventListener(
          "visibilitychange",
          onHiddenOrPageHide,
          true
        );
        window.removeEventListener("pagehide", onHiddenOrPageHide, true);
      }
    }
  };
  // onBeforeunload, onHidden不如visibilitychange和pagehide稳妥，因为在手机上用户直接home回桌面不会触发onBeforeunload, onHidden，但是会触发visibilitychange和pagehide
  window.addEventListener("visibilitychange", onHiddenOrPageHide, true);
  window.addEventListener("pagehide", onHiddenOrPageHide, true);
};

export const getPageURL = () => {
  return window.location.href;
};

export const onBFCacheRestore = (callback) => {
  window.addEventListener(
    "pageshow",
    (event) => {
      if (event.persisted) {
        callback(event);
      }
    },
    true
  );
};

export const executeAfterLoad = (cb) => {
  if (document.readyState === "complete") {
    cb();
  } else {
    const onLoad = () => {
      cb();
      window.removeEventListener("load", onLoad, true);
    };

    window.addEventListener("load", onLoad, true);
  }
};

export const isPerformanceSupported = () => {
  return (
    !!window.performance &&
    !!window.performance.getEntriesByType &&
    !!window.performance.mark
  );
};

export const isPerformanceObserverSupported = () => {
  return !!window.PerformanceObserver;
};

export const observe = (type, cb) => {
  try {
    if (PerformanceObserver.supportedEntryTypes?.includes(type)) {
      const po = new PerformanceObserver((l) => l.getEntries().map(cb));
      po.observe({ type, buffered: true });
      return po;
    }
  } catch (e) {
    throw e;
  }
};
