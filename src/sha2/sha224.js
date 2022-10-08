import { f_bit_to_hex_01_x32 as f_bit_to_hex } from "../utils.js";
import Sha256 from "./sha256.js";

class Sha224 extends Sha256 {
  constructor(){
    super([
      0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
      0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4,
    ]);
  }
  to_hex(){
    this.h.pop(); // this.h = this.h.filter((e, i) => i < 7);
    return this.h.map(f_bit_to_hex).join("");
  }
}

export default Sha224;
