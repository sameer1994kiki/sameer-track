import { xhrProto, xhrOpen, xhrSend } from "../utils/xhr";
import { lazyRequest } from "../utils/request";

const overwriteXhr = () => {
  xhrProto.open = function newOpen(...args) {
    this.method = args[0];
    this.url = args[1];
    xhrOpen.apply(this, args);
  };
  xhrProto.send = function newSend(...args) {
    this.startTime = +new Date();
    const onLoaded = () => {
      this.endTime = +new Date();
      this.duration = this.endTime - this.startTime;
      const { status, duration, startTime, endTime, url, method } = this;
      const reportData = {
        type: "performance",
        subType: "xhr",
        status,
        duration,
        startTime,
        endTime,
        url,
        method: (method || "GET").toUpperCase(),
        success: status >= 200 && status < 300,
      };
      lazyRequest(reportData);
      this.removeEventListener("loadend", onLoaded, true);
    };
    this.addEventListener("loadend", onLoaded, true);
    xhrSend.apply(this, args);
  };
};
export default function xhr() {
  overwriteXhr();
}
