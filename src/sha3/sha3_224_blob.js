import Sha3_224 from "./sha3_224.js";

const sha3_224 = new Sha3_224();

const sha3_224_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha3_224.update(d);
    i += n;
  }
  return sha3_224.hex();
}

export default sha3_224_blob;
