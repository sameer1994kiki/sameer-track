import { lazyRequest } from "../utils/request";
const onVueRouter = (router) => {
  router.beforeEach((to, from, next) => {
    if (!from.name) {
      return next();
    }

    const data = {
      params: to.params,
      query: to.query,
    };
    lazyRequest({
      type: "behavior",
      subType: "vue-router-change-pv",
      name: to.name || to.path,
      from: from.fullPath,
      to: to.fullPath,
      data,
    });
    next();
  });
};

export default onVueRouter;
