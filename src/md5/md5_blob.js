import Md5 from "./md5.js";

const md5 = new Md5();

const md5_blob = async (blob) => {
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    md5.update(d);
    i += n;
  }
  return md5.hex();
}

export default md5_blob;
