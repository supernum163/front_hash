import Blake2s_256 from "./blake2s_256.js";

const blake2s_256 = new Blake2s_256();

const blake2s_256_blob = async (blob, key) => {
  blake2s_256.set_key(key);
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    blake2s_256.update(d);
    i += n;
  }
  return blake2s_256.hex();
}

export default blake2s_256_blob;
