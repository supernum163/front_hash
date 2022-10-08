import { new_array } from "../utils.js";
import Hash_x32 from "../hash_x32.js";
import State from "./state.js";

class Sha3 extends Hash_x32 {
  constructor(c, d, xof=false) {
    let r_byte = (1600 - c) / 8;
    super(r_byte, 0);
    this.xof = xof;
    this.state = new State(1600, 24, d);
    super.reset();
  }
  add_length(length) {
    this.length = (this.length + length) % this.batch_size;
  }
  get_length() {
    return this.batch_size - this.length;
  }
  reset() {
    super.reset();
    this.state.reset();
  }
  exec(data) {
    this.state.absorb(data);
  }
  padding(){
    // 最后一批数据大小可能恰好等于batch_size
    if (this.data.length >= this.batch_size) {
      this.exec(this.data.splice(0, this.batch_size));
    }
    let len = this.get_length();
    if (len === 1) {
      this.data.push(this.xof? 0x9f: 0x86);
    } else {
      this.data.push(this.xof? 0x1f: 0x06);
      this.data = this.data.concat(new_array(len - 2));
      this.data.push(0x80);
    }
  }
  to_hex() {
    return this.state.squeeze();
  }
}

export default Sha3;
