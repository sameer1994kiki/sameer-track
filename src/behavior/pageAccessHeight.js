import { lazyRequest, request } from "../utils/request";
import { onBeforeunload, executeAfterLoad } from "../utils/utils";
let timer;
let startTime = 0;
let hasReport = false;
let pageHeight = 0;
let scrollTop = 0;
// let viewPortHeight = 0;

function onScroll() {
  clearTimeout(timer);
  const now = performance.now();
  if (!hasReport) {
    hasReport = true;
    lazyRequest({
      duration: now - startTime,
      type: "behavior",
      subType: "page-access-height",
      // value: toPercent((scrollTop + viewportHeight) / pageHeight),
    });
  }

  timer = setTimeout(() => {
    hasReport = false;
    startTime = now;
    pageHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    // viewportHeight = window?.innerHeight || 0;
  }, 500);
}

function toPercent(val) {
  if (val >= 1) return "100%";
  return (val * 100).toFixed(2) + "%";
}

const pageAccessHeight = () => {
  window.addEventListener("scroll", onScroll);
  onBeforeunload(() => {
    const now = performance.now();
    request(
      {
        startTime: now,
        duration: now - startTime,
        type: "behavior",
        subType: "page-access-height",
        // value: toPercent((scrollTop + viewportHeight) / pageHeight),
      },
      true
    );
  });
  // 页面加载完成后初始化记录当前访问高度、时间
  executeAfterLoad(() => {
    startTime = performance.now();
    pageHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // viewportHeight = window.innerHeight;
  });
};
export default pageAccessHeight;
