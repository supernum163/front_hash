import Sha512 from "./sha512.js";

class Sha224 extends Sha512 {
  constructor(){
    super([
      [0x8c3d37c8, 0x19544da2], [0x73e19966, 0x89dcd4d6],
      [0x1dfab7ae, 0x32ff9c82], [0x679dd514, 0x582f9fcf],
      [0x0f6d2b69, 0x7bd44da8], [0x77e36f73, 0x04c48942],
      [0x3f9d85a8, 0x6a1d36c8], [0x1112e6ad, 0x91d692a1], 
    ]);
  }
  // 返回hash值
  to_hex(){
    let r = super.to_hex();
    return r.substr(0, 56);
  }
}

export default Sha224;
  