import Blake2 from "./blake2.js";

class Blake2b_256 extends Blake2 {
  constructor(key="") {
    super(64, 32, key);
  }
}

export default Blake2b_256;
