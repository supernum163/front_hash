import Sha1 from "./sha1.js";

const sha1 = new Sha1();

const sha1_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha1.update(d);
    i += n;
  }
  return sha1.hex();
}

export default sha1_blob;
