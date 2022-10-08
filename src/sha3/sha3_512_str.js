import Sha3_512 from "./sha3_512.js";

const sha3_512 = new Sha3_512();

const sha3_512_str = (s) => {
  sha3_512.update(s);
  return sha3_512.hex();
}

export default sha3_512_str;
