import Sha3_384 from "./sha3_384.js";

const sha3_384 = new Sha3_384();

const sha3_384_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha3_384.update(d);
    i += n;
  }
  return sha3_384.hex();
}

export default sha3_384_blob;
