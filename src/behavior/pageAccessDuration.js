import { onBeforeunload } from "../utils/utils";
import { lazyRequest } from "../utils/request";
const pageChange = () => {
  onBeforeunload(() => {
    lazyRequest(
      {
        type: "behavior",
        subType: "page-access-duration",
      },
      true
    );
  });
};

export default pageChange;
