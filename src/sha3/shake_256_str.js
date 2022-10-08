import Shake_256 from "./shake_256.js";

const shake_256 = new Shake_256();

const shake_256_str = (s, d) => {
  if (d) shake_256.state.set_d(d);
  shake_256.update(s);
  return shake_256.hex();
}

export default shake_256_str;
