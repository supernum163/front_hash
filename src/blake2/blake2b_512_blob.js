import Blake2b_512 from "./blake2b_512.js";

const blake2b_512 = new Blake2b_512();

const blake2b_512_blob = async (blob, key) => {
  blake2b_512.set_key(key);
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    blake2b_512.update(d);
    i += n;
  }
  return blake2b_512.hex();
}

export default blake2b_512_blob;
