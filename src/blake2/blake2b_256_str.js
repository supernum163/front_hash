import Blake2b_256 from "./blake2b_256.js";

const blake2b_256 = new Blake2b_256();

const blake2b_256_str = (s, key) => {
  blake2b_256.set_key(key);
  blake2b_256.update(s);
  return blake2b_256.hex();
}

export default blake2b_256_str;
