import Blake2b_256 from "./blake2b_256.js";

const blake2b_256 = new Blake2b_256();

const blake2b_256_blob = async (blob, key) => {
  blake2b_256.set_key(key);
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    blake2b_256.update(d);
    i += n;
  }
  return blake2b_256.hex();
}

export default blake2b_256_blob;
