import { getPageURL } from "../utils/utils";
import { lazyRequest } from "../utils/request";
const pageChange = () => {
  if (window.history) {
    const originPushState = history.pushState;
    const originReplaceState = history.replaceState;

    history.pushState = function (...args) {
      lazyRequest({
        args,
        type: "behavior",
        subType: "pushState",
      });
      originPushState.apply(window.history, args);
    };

    history.replaceState = function (...args) {
      lazyRequest({
        args,
        type: "behavior",
        subType: "replaceState",
      });
      originReplaceState.apply(window.history, args);
    };
  }
};

export default pageChange;
