import Sha3 from "./sha3.js";

class Sha3_256 extends Sha3 {
  constructor() {
    super(512, 256);
  }
}

export default Sha3_256;
