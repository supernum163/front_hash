import Sha224 from "./sha224.js";

const sha224 = new Sha224();

const sha224_str = (s) => {
  sha224.update(s);
  return sha224.hex();
}

export default sha224_str;
