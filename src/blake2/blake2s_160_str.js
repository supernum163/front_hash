import Blake2s_160 from "./blake2s_160.js";

const blake2s_160 = new Blake2s_160();

const blake2s_160_str = (s, key) => {
  blake2s_160.set_key(key);
  blake2s_160.update(s);
  return blake2s_160.hex();
}

export default blake2s_160_str;
