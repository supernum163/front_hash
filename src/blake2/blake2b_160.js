import Blake2 from "./blake2.js";

class Blake2b_160 extends Blake2 {
  constructor(key="") {
    super(64, 20, key);
  }
}

export default Blake2b_160;
