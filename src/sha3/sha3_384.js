import Sha3 from "./sha3.js";

class Sha3_384 extends Sha3 {
  constructor() {
    super(768, 384);
  }
}

export default Sha3_384;
