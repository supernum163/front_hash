import Hash_x32 from "./hash_x32.js";
import { f_x64_to_x32 } from "./utils.js";

// 核心实现类
class Hash_x64 extends Hash_x32 {
  reset_length() {
    this.length = 0n;
  }
  add_length(length) {
    this.length += BigInt(length);
  }
  get_length() {
    return [this.length >> 61n, this.length << 3n].map(f_x64_to_x32);
  }
}

export default Hash_x64;

