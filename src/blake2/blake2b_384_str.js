import Blake2b_384 from "./blake2b_384.js";

const blake2b_384 = new Blake2b_384();

const blake2b_384_str = (s, key) => {
  blake2b_384.set_key(key);
  blake2b_384.update(s);
  return blake2b_384.hex();
}

export default blake2b_384_str;
