import Blake2s_128 from "./blake2s_128.js";

const blake2s_128 = new Blake2s_128();

const blake2s_128_blob = async (blob, key) => {
  blake2s_128.set_key(key);
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    blake2s_128.update(d);
    i += n;
  }
  return blake2s_128.hex();
}

export default blake2s_128_blob;
