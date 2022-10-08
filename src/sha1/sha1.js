import Hash_x32 from "../hash_x32.js";
import { 
  f_bit_add_x32 as f_bit_add, 
  f_bit_to_hex_01_x32 as f_bit_to_hex, 
  f_bit_rotate_left_x32 as f_bit_rotate_left, 
} from "../utils.js";

// 核心实现类
class Sha1 extends Hash_x32 {
  constructor(){
    super(64, 80);
    this.reset();
  }
  reset(){
    super.reset();
    this.a = 0x67452301;
    this.b = 0xEFCDAB89;
    this.c = 0x98BADCFE;
    this.d = 0x10325476;
    this.e = 0xC3D2E1F0;
  }
  // 基本函数
  Ch(x, y, z){ 
    return (x & y) ^ ((~x) & z) 
  }
  Parity(x, y, z){ 
    return x ^ y ^ z 
  }
  Maj(x, y, z){ 
    return (x & y) ^ (x & z) ^ (y & z)
  }
  // 单次更新四个标准幻数
  exec(data){
    let i, x, y, k;
    this.M.fill(0);
    for (i = 0; i < 64; i++) {
      x = parseInt(i / 4);
      this.M[x] = this.M[x] << 8 | data[i];
    }
    if (this.status === 1) {
      this.M[15] = this.length << 3;
      this.M[14] = this.length >>> 29;
      this.status = 2;
    }
    for (i = 16; i < 80; i++) {
      this.M[i] = f_bit_rotate_left(this.M[i-3] ^ this.M[i-8] ^ this.M[i-14] ^ this.M[i-16], 1)
    }
    let a = this.a;
    let b = this.b;
    let c = this.c;
    let d = this.d;
    let e = this.e;
    for (i = 0; i < 80; i++) {
      if (i < 20) {
        x = this.Ch(b, c, d);
        k = 0x5A827999;
      } else if (i < 40) {
        x = this.Parity(b, c, d);
        k = 0x6ED9EBA1;
      } else if (i < 60) {
        x = this.Maj(b, c, d);
        k = 0x8F1BBCDC;
      } else {
        x = this.Parity(b, c, d);
        k = 0xCA62C1D6;
      }
      y = f_bit_rotate_left(a, 5);
      x = f_bit_add(y, x);
      x = f_bit_add(e, x);
      x = f_bit_add(this.M[i], x);
      x = f_bit_add(k, x);
      e = d;
      d = c;
      c = f_bit_rotate_left(b, 30);
      b = a;
      a = x;
    }
    this.a = f_bit_add(this.a, a);
    this.b = f_bit_add(this.b, b);
    this.c = f_bit_add(this.c, c);
    this.d = f_bit_add(this.d, d);
    this.e = f_bit_add(this.e, e);
  }
  // 返回hash值
  to_hex(){
    return f_bit_to_hex(this.a) + f_bit_to_hex(this.b) + 
        f_bit_to_hex(this.c) + f_bit_to_hex(this.d) +
        f_bit_to_hex(this.e);
  }
}

export default Sha1;
