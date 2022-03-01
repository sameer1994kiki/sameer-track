import { getPageURL } from "../utils/utils";
import { lazyRequest } from "../utils/request";
const pageChange = () => {
  // 放在localStorage中比较好
  // 对pushSTate和replaceState的重写见web-tracing/packages/core/src/lib/pv.js
  let from = "";
  window.addEventListener(
    "popstate",
    () => {
      const to = getPageURL();
      lazyRequest({
        from,
        to,
        type: "behavior",
        subType: "popstate",
      });
      from = "to";
    },
    true
  );

  let oldURL = "";
  window.addEventListener(
    "hashchange",
    (event) => {
      const newURL = event.newURL;
      const to = getPageURL();
      lazyRequest({
        from: oldURL,
        to: to,
        type: "behavior",
        subType: "hashchange",
      });
      oldURL = newURL;
    },
    true
  );
};

export default pageChange;
