import { request } from "../utils/request";
import {
  isPerformanceObserverSupported,
  isPerformanceSupported,
  observe,
} from "../utils/utils";

export default function fp() {
  if (isPerformanceObserverSupported()) {
    const entryHandler = (entry) => {
      if (po) {
        po.disconnect();
      }
      const reportData = {
        type: "performance",
        subType: "fid",
        time: entry.startTime,
      };
      request(reportData);
    };
    const po = observe("first-input", entryHandler);
  } else {
    console.warn("browser do not support performanceObserver");
    return;
  }
}
