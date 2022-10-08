import Blake2b_512 from "./blake2b_512.js";

const blake2b_512 = new Blake2b_512();

const blake2b_512_str = (s, key) => {
  blake2b_512.set_key(key);
  blake2b_512.update(s);
  return blake2b_512.hex();
}

export default blake2b_512_str;
