import { lazyRequest } from "../utils/request";
const originalFetch = window.fetch;

const overwriteFetch = () => {
  window.fetch = function newFetch(url, config) {
    const startTime = +new Date();
    const reportData = {
      subType: "fetch",
      type: "performance",
      startTime,
      url,
      method: (config?.method || "GET").toUpperCase(),
    };
    return originalFetch(url, config)
      .then((res) => {
        reportData.endTime = Date.now();
        reportData.duration = reportData.endTime - reportData.startTime;
        const data = res.clone();
        reportData.status = data.status;
        reportData.success = data.ok;
        lazyRequest(reportData);
        return res;
      })
      .catch((err) => {
        reportData.endTime = Date.now();
        reportData.duration = reportData.endTime - reportData.startTime;
        reportData.status = 0;
        reportData.success = false;

        lazyReportCache(reportData);

        throw err;
      });
  };
};
export default function fetch() {
  overwriteFetch();
}
