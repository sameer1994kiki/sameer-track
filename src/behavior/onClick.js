import { lazyRequest } from "../utils/request";

const onClick = () => {
  ["click", "touchstart", "mousedown", "keydown", "mouseover"].forEach(
    (type) => {
      let timer;
      window.addEventListener(type, (event) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const target = event.target;
          const { top, left } = target.getBoundingClientRect();
          lazyRequest({
            type: "behavior",
            subType: "click",
            target: target.tagName,
            paths: event.path?.map((item) => item.tagName).filter(Boolean),
            startTime: event.timeStamp,
            outerHTML: target.outerHTML,
            innerHTML: target.innerHTML,
            width: target.offsetWidth,
            height: target.offsetHeight,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            top,
            left,
            eventType,
            pageHeight:
              document.documentElement.scrollHeight ||
              document.body.scrollHeight,
            scrollTop:
              document.documentElement.scrollTop || document.body.scrollTop,
          });
        }, 500);
      });
    }
  );
};
export default onClick;
