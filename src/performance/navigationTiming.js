import { request } from "../utils/request";
import { isPerformanceObserverSupported, observe } from "../utils/utils";

let value = 0;
export default function fp() {
  if (isPerformanceObserverSupported()) {
    const entryHandler = (entry) => {
      if (entry.entryType === "navigation") {
        if (po) {
          po.disconnect();
        }

        const reportData = {
          type: "performance",
          subType: "timing",
          time: entry,
        };
        request(reportData);
      }
    };

    const po = observe("navigation", entryHandler);
  } else {
    const navigation =
      performance.getEntriesByType("navigation").length > 0
        ? performance.getEntriesByType("navigation")[0]
        : performance.timing;

    const reportData = {
      type: "performance",
      subType: "timing",
      time: navigation,
    };
    request(reportData);
  }
}
