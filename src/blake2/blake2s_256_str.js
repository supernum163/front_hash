import Blake2s_256 from "./blake2s_256.js";

const blake2s_256 = new Blake2s_256();

const blake2s_256_str = (s, key) => {
  blake2s_256.set_key(key);
  blake2s_256.update(s);
  return blake2s_256.hex();
}

export default blake2s_256_str;
