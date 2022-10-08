import Sha3 from "./sha3.js";

class Shake_128 extends Sha3 {
  constructor(d = 128) {
    super(256, d, true);
  }
}

export default Shake_128;
