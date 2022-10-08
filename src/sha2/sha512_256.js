import Sha512 from "./sha512.js";

class Sha256 extends Sha512 {
  constructor(){
    super([
      [0x22312194, 0xfc2bf72c], [0x9f555fa3, 0xc84c64c2], 
      [0x2393b86b, 0x6f53b151], [0x96387719, 0x5940eabd], 
      [0x96283ee2, 0xa88effe3], [0xbe5e1e25, 0x53863992], 
      [0x2b0199fc, 0x2c85b8aa], [0x0eb72ddc, 0x81c52ca2], 
    ]);
  }
  // 返回hash值
  to_hex(){
    let r = super.to_hex();
    return r.substr(0, 64);
  }
}

export default Sha256;
  