import Sha512_224 from "./sha512_224.js";

const sha512_224 = new Sha512_224();

const sha512_224_str = (s) => {
  sha512_224.update(s);
  return sha512_224.hex();
}

export default sha512_224_str;
