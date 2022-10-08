import Sha3_256 from "./sha3_256.js";

const sha3_256 = new Sha3_256();

const sha3_256_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha3_256.update(d);
    i += n;
  }
  return sha3_256.hex();
}

export default sha3_256_blob;
