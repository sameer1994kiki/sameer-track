import xhr from "./xhr";
import fetch from "./fetch";
import fps from "./fps";
import fp from "./fp";
import fcp from "./fcp";
import lcp from "./lcp";
import fid from "./fid";
import cls from "./cls";
import navigationTiming from "./navigationTiming";
export default function performance() {
  xhr();
  fetch();
  fps();
  fp();
  fcp();
  lcp();
  fid();
  cls();
  navigationTiming();
}

// https://mp.weixin.qq.com/s/4-Lnz59EH4tQpP1YnyVvfQ
// https://mp.weixin.qq.com/s/eg7v7SQ_D6Vi2QTRJ5iHNA
// https://mp.weixin.qq.com/s/Y7m540LdoMUMKRh7TfdttA
// https://mp.weixin.qq.com/s/62rf6BWLZqYyzcIC0EUZLg
