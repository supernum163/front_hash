import Sha256 from "./sha256.js";

const sha256 = new Sha256();

const sha256_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha256.update(d);
    i += n;
  }
  return sha256.hex();
}

export default sha256_blob;
