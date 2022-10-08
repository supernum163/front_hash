import Blake2s_128 from "./blake2s_128.js";

const blake2s_128 = new Blake2s_128();

const blake2s_128_str = (s, key) => {
  blake2s_128.set_key(key);
  blake2s_128.update(s);
  return blake2s_128.hex();
}

export default blake2s_128_str;
