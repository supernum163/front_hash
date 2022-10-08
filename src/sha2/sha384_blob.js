import Sha384 from "./sha384.js";

const sha384 = new Sha384();

const sha384_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha384.update(d);
    i += n;
  }
  return sha384.hex();
}

export default sha384_blob;
