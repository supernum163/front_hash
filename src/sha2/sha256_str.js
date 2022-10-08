import Sha256 from "./sha256.js";

const sha256 = new Sha256();

const sha256_str = (s) => {
  sha256.update(s);
  return sha256.hex();
}

export default sha256_str;
