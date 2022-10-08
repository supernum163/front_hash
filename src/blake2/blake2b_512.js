import Blake2 from "./blake2.js";

class Blake2b_512 extends Blake2 {
  constructor(key="") {
    super(64, 64, key);
  }
}

export default Blake2b_512;
