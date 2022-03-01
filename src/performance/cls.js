import { request } from "../utils/request";
import {
  isPerformanceObserverSupported,
  isPerformanceSupported,
  observe,
} from "../utils/utils";

let value = 0;
export default function fp() {
  if (isPerformanceObserverSupported()) {
    const entryHandler = (entry) => {
      if (po) {
        po.disconnect();
      }
      if (!entry.hadRecentInput) {
        value = value + entry.value;
      }

      const reportData = {
        type: "performance",
        subType: "cls",
        time: value,
      };
      request(reportData);
    };
    const po = observe("layout-shift", entryHandler);
  } else {
    console.warn("browser do not support performanceObserver");
    return;
  }
}
