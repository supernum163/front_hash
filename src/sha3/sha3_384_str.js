import Sha3_384 from "./sha3_384.js";

const sha3_384 = new Sha3_384();

const sha3_384_str = (s) => {
  sha3_384.update(s);
  return sha3_384.hex();
}

export default sha3_384_str;
