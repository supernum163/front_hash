import Sha3 from "./sha3.js";

class Sha3_512 extends Sha3 {
  constructor() {
    super(1024, 512);
  }
}

export default Sha3_512;
