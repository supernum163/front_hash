import Sha3 from "./sha3.js";

class Sha3_224 extends Sha3 {
  constructor() {
    super(448, 224);
  }
}

export default Sha3_224;
