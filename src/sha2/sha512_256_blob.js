import Sha512_256 from "./sha512_256.js";

const sha512_256 = new Sha512_256();

const sha512_256_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    sha512_256.update(d);
    i += n;
  }
  return sha512_256.hex();
}

export default sha512_256_blob;
