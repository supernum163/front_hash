import { f_hex_to_bit_x8, f_utf8_enc, new_array } from "../utils.js";

/*
** Hash 表示需要用于加密的Hash函数
** key 表示 "message authentication codes" (MAC), 即对信息验证码
** data 表示需要加密的信息
** B 表示 block size, 即Hash函数中每个批次需要处理多少字节的数据
** T 表示需要截取多少位HMAC, 单位以字节表示，不能超出Hash函数返回值的长度
*/
const hmac = (Hash, key, data, B=64, T) => {
  if (typeof(key) == "string") {
    key = f_utf8_enc(key);
  }
  if (key.length > B) {
    key = f_hex_to_bit_x8(Hash(key));
  }
  if (key.length < B) {
    key = key.concat(new_array(B - key.length));
  }
  // tmp = H(K XOR ipad, text)
  let after_ipad = key.map(e => e ^ 0x36);
  if (typeof(data) == "string") {
    data = f_utf8_enc(data);
  }
  let tmp = Hash(after_ipad.concat(data));
  tmp = f_hex_to_bit_x8(tmp);
  // H(K XOR opad, tmp)  
  let after_0pad = key.map(e => e ^ 0x5C);
  let r = Hash(after_0pad.concat(tmp));
  // 截取相应位数的HMAC
  if (T) r.substr(0, 2 * T);
  return r;
}


export default hmac;
