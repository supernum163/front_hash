import Blake2 from "./blake2.js";

class Blake2s_128 extends Blake2 {
  constructor(key="") {
    super(32, 16, key);
  }
}

export default Blake2s_128;
