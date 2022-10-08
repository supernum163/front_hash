import Shake_128 from "./shake_128.js";

const shake_128 = new Shake_128();

const shake_128_blob = async (blob, d) => {
  if (d) shake_128.state.set_d(d);
  let i = 0;
  let n = 64;
  while (true) {
    let b = await blob.slice(i, i+n).arrayBuffer();
    if (b.byteLength <= 0) break;
    let d = Array.from(new Uint8Array(b));
    shake_128.update(d);
    i += n;
  }
  return shake_128.hex();
}

export default shake_128_blob;
