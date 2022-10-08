import Sha512 from "./sha512.js";

const sha512 = new Sha512();

const sha512_str = (s) => {
  sha512.update(s);
  return sha512.hex();
}

export default sha512_str;
