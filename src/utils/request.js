import { xhrOpen, xhrSend } from "./xhr";
import { addData, getData, clearData } from "./data";
import { getUuid } from "./utils";
import config from "../config";
import { getPageURL } from "../utils/utils";
const isSupportSendBeacon = !!window?.navigator?.sendBeacon;
const xhrRequest = (data) => {
  const xhr = new XMLHttpRequest();
  xhrOpen.call(xhr, "post", config.url);
  xhrSend.call(xhr, "post", JSON.stringify(data));
};
const requestFn = isSupportSendBeacon
  ? window.navigator.sendBeacon.bind(window.navigator)
  : xhrRequest;

export const request = (data, immediate) => {
  if (!config.url) {
    console.error("请设置url");
  }
  const bodyData = JSON.stringify({
    id: getUuid(),
    appID: config.appID,
    userID: config.userID,
    data,
  });
  if (immediate) {
    console.log("数据我已经上传啦");
    requestFn(config.url, bodyData);
    return;
  }
  if (window.requestIdleCallback) {
    window.requestIdleCallback(
      () => {
        console.log("数据我已经上传啦");
        requestFn(config.url, bodyData);
      },
      { timeout: 3000 }
    );
  } else {
    setTimeout(() => {
      console.log("数据我已经上传啦");
      requestFn(config.url, reportData);
    });
  }
};

let timer = null;
export function lazyRequest(item, timeout = 3000) {
  const i = { ...item };
  i.pageURL = getPageURL();
  // performance.now(),从 page load 的时候从零开始计数。
  if (!i.startTime) {
    i.startTime = performance.now();
  }
  i.id = getUuid();
  i.date = +new Date();
  addData(item);
  clearTimeout(timer);
  timer = setTimeout(() => {
    const data = getData();
    if (data.length) {
      request(data);
      clearData();
    }
  }, timeout);
}
