import Sha3_512 from "./sha3_512.js";

const sha3_512 = new Sha3_512();

const sha3_512_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha3_512.update(d);
    i += n;
  }
  return sha3_512.hex();
}

export default sha3_512_blob;
