import Sha512 from "./sha512.js";

const sha512 = new Sha512();

const sha512_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha512.update(d);
    i += n;
  }
  return sha512.hex();
}

export default sha512_blob;
