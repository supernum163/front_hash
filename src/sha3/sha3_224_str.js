import Sha3_224 from "./sha3_224.js";

const sha3_224 = new Sha3_224();

const sha3_224_str = (s) => {
  sha3_224.update(s);
  return sha3_224.hex();
}

export default sha3_224_str;
