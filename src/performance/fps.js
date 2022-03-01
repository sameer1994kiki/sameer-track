import { request } from "../utils/request";
import { deepClone } from "../utils/utils";

const next =
  window.requestAnimationFrame ||
  ((cb) => {
    setTimeout(cb, 1000 / 60);
  });

// 参考https://juejin.cn/post/6844903744862175246
const frames = [];
export default function fps() {
  let frame = 0;
  let lastSecond = +new Date();
  function calculateFPS() {
    frame++;
    const now = +new Date();
    // 在1s内
    if (lastSecond + 1000 <= now) {
      const fps = Math.round((frame * 1000) / (now - lastSecond));
      frames.push(fps);
      frame = 0;
      lastSecond = now;
    }
    if (frames.length >= 60) {
      request(
        deepClone({
          frames,
          type: "performace",
          subType: "fps",
        })
      );
      frames.length = 0;
    }
    next(calculateFPS);
  }
  calculateFPS();
}
export const isLowFPS = (FPSList, below, number) => {
  let count = 0;
  for (let i = 0; i < FPSList.length; i++) {
    if (FPSList[i] < below) {
      count++;
    } else {
      count = 0;
    }
    if (count >= number) {
      return true;
    }
  }
  return false;
};
