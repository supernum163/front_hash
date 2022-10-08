import Blake2 from "./blake2.js";

class Blake2s_256 extends Blake2 {
  constructor(key="") {
    super(32, 32, key);
  }
}

export default Blake2s_256;
