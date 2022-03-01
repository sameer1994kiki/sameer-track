import pv from "./pv";
import pageChange from "./pageChange";
import onVueRouter from "./onVueRouter";
import config from "../config";
import pageAccessHeight from "./pageAccessHeight";
export default function behavior() {
  pv();
  pageChange();
  pageAccessHeight();
  if (config.vue?.router) {
    onVueRouter(config.vue?.router);
  }
}
