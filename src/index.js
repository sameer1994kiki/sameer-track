import { setConfig } from "./config";
import { onBeforeunload, onHidden } from "./utils/utils";
import { request } from "./utils/request";
import { getData, clearData } from "./utils/data";
import error from "./error";
import behavior from "./behavior";

const track = {
  init: (options = {}) => {
    setConfig(options);
    error();
    behavior();
    beforeUnloadRequest();
  },
  trackData: ({ immediate }) => {
    if (immediate) {
      console.log("立即上报数据");
    } else {
      console.log("稍后统一上报");
    }
  },
};
export default track;

function beforeUnloadRequest() {
  [onBeforeunload, onHidden].forEach((fn) => {
    fn(() => {
      const data = getData();
      if (data.length) {
        request(data, true);
        clearData();
      }
    });
  });
}
