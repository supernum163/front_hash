import Sha3 from "./sha3.js";

class Shake_256 extends Sha3 {
  constructor(d = 256) {
    super(512, d, true);
  }
}

export default Shake_256;
