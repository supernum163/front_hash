import Blake2 from "./blake2.js";

class Blake2s_160 extends Blake2 {
  constructor(key="") {
    super(32, 20, key);
  }
}

export default Blake2s_160;
