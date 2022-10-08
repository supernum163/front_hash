import Sha384 from "./sha384.js";

const sha384 = new Sha384();

const sha384_str = (s) => {
  sha384.update(s);
  return sha384.hex();
}

export default sha384_str;
