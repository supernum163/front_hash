import Shake_128 from "./shake_128.js";

const shake_128 = new Shake_128();

const shake_128_str = (s, d) => {
  if (d) shake_128.state.set_d(d);
  shake_128.update(s);
  return shake_128.hex();
}

export default shake_128_str;
