import { lazyRequest } from "../utils/request";

const pv = () => {
  lazyRequest({
    type: "behavior",
    subType: "pv",
    referrer: document.referrer,
  });
};
export default pv;
