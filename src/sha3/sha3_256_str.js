import Sha3_256 from "./sha3_256.js";

const sha3_256 = new Sha3_256();

const sha3_256_str = (s) => {
  sha3_256.update(s);
  return sha3_256.hex();
}

export default sha3_256_str;
