import { request } from "../utils/request";
import {
  isPerformanceObserverSupported,
  isPerformanceSupported,
  observe,
} from "../utils/utils";

export default function fp() {
  if (isPerformanceObserverSupported()) {
    const entryHandler = (entry) => {
      if (entry.name === "first-contentful-paint") {
        if (po) {
          po.disconnect();
        }
        const reportData = {
          type: "performance",
          subType: "fcp",
          time: entry.startTime,
        };
        request(reportData);
      }
    };
    const po = observe("paint", entryHandler);
  } else {
    if (isPerformanceSupported()) {
      const [entry] = performance.getEntriesByName("first-contentful-paint");

      if (entry) {
        const reportData = {
          type: "performance",
          subType: "fcp",
          time: entry.startTime,
        };
        request(reportData);
        return;
      }

      reject(new Error("browser has no fcp"));
    } else {
      reject(new Error("browser do not support performance"));
    }
  }
}
