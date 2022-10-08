import Shake_256 from "./shake_256.js";

const shake_256 = new Shake_256();

const shake_256_blob = async (blob, d) => {
  if (d) shake_256.state.set_d(d);
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    shake_256.update(d);
    i += n;
  }
  return shake_256.hex();
}

export default shake_256_blob;
