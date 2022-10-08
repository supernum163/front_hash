import Blake2s_160 from "./blake2s_160.js";

const blake2s_160 = new Blake2s_160();

const blake2s_160_blob = async (blob, key) => {
  blake2s_160.set_key(key);
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    blake2s_160.update(d);
    i += n;
  }
  return blake2s_160.hex();
}

export default blake2s_160_blob;
