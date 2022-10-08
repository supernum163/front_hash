import Sha224 from "./sha224.js";

const sha224 = new Sha224();

const sha224_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha224.update(d);
    i += n;
  }
  return sha224.hex();
}

export default sha224_blob;
