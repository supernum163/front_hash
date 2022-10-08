import Blake2b_160 from "./blake2b_160.js";

const blake2b_160 = new Blake2b_160();

const blake2b_160_str = (s, key) => {
  blake2b_160.set_key(key);
  blake2b_160.update(s);
  return blake2b_160.hex();
}

export default blake2b_160_str;
