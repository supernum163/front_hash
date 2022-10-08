import Sha1 from "./sha1.js";

const sha1 = new Sha1();

const sha1_str = (s) => {
  sha1.update(s);
  return sha1.hex();
}

export default sha1_str;
