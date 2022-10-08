import Sha512_256 from "./sha512_256.js";

const sha512_256 = new Sha512_256();

const sha512_256_str = (s) => {
  sha512_256.update(s);
  return sha512_256.hex();
}

export default sha512_256_str;
