import Sha512_224 from "./sha512_224.js";

const sha512_224 = new Sha512_224();

const sha512_224_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha512_224.update(d);
    i += n;
  }
  return sha512_224.hex();
}

export default sha512_224_blob;
