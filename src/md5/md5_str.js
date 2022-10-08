import Md5 from "./md5.js";

const md5 = new Md5();

const md5_str = (s) => {
  md5.update(s);
  return md5.hex();
}

export default md5_str;
