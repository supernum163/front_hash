import Blake2s_224 from "./blake2s_224.js";

const blake2s_224 = new Blake2s_224();

const blake2s_224_str = (s, key) => {
  blake2s_224.set_key(key);
  blake2s_224.update(s);
  return blake2s_224.hex();
}

export default blake2s_224_str;
