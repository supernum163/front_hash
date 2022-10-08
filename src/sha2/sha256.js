import Hash_x32 from "../hash_x32.js";
import { 
  f_bit_add_x32 as f_bit_add, 
  f_bit_rotate_right_x32 as f_bit_rotate_right, 
  f_bit_to_hex_01_x32 as f_bit_to_hex, 
} from "../utils.js";



// 核心实现类
class Sha256 extends Hash_x32 {
  constructor(H){
    super(64, 64);
    // 初始化hash值
    this.H = H || [
      0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 
      0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19,
    ];
    this.h = [];
    // 64个素数立方根的小数部分表示的常量
    this.K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 
      0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 
      0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 
      0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 
      0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 
      0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 
      0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2, 
    ];
    // 重置
    this.reset();
  }
  reset(){
    super.reset();
    this.h = Array.from(this.H);
  }
  // 基本函数
  Ch(x, y, z){ 
    return (x & y) ^ ((~x) & z) 
  }
  Maj(x, y, z){ 
    return (x & y) ^ (x & z) ^ (y & z)
  }
  Sigma0(x){
    return f_bit_rotate_right(x, 2) ^ f_bit_rotate_right(x, 13) ^ f_bit_rotate_right(x, 22);
  }
  Sigma1(x){
    return f_bit_rotate_right(x, 6) ^ f_bit_rotate_right(x, 11) ^ f_bit_rotate_right(x, 25);
  }
  sigma0(x){
    return f_bit_rotate_right(x, 7) ^ f_bit_rotate_right(x, 18) ^ (x >>> 3);
  }
  sigma1(x){
    return f_bit_rotate_right(x, 17) ^ f_bit_rotate_right(x, 19) ^ (x >>> 10);
  }
  // 单次更新四个标准幻数
  exec(data){
    let i, x, y, z;
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
    for (i = 16; i < 64; i++) {
      z = this.sigma1(this.M[i-2])
      z = f_bit_add(z, this.M[i-7])
      z = f_bit_add(z, this.sigma0(this.M[i-15]))
      this.M[i] = f_bit_add(z, this.M[i-16])
    }
    let a = this.h[0];
    let b = this.h[1];
    let c = this.h[2];
    let d = this.h[3];
    let e = this.h[4];
    let f = this.h[5];
    let g = this.h[6];
    let h = this.h[7];
    for (i = 0; i < 64; i++) {
      x = this.Sigma1(e);
      x = f_bit_add(h, x);
      z = this.Ch(e, f, g);
      x = f_bit_add(x, z);
      x = f_bit_add(x, this.K[i]);
      x = f_bit_add(x, this.M[i]);
      y = this.Sigma0(a);
      z = this.Maj(a, b, c);
      y = f_bit_add(y, z);
      h = g;
      g = f;
      f = e;
      e = f_bit_add(d, x);
      d = c;
      c = b;
      b = a;
      a = f_bit_add(x, y);
    }
    this.h[0] = f_bit_add(this.h[0], a);
    this.h[1] = f_bit_add(this.h[1], b);
    this.h[2] = f_bit_add(this.h[2], c);
    this.h[3] = f_bit_add(this.h[3], d);
    this.h[4] = f_bit_add(this.h[4], e);
    this.h[5] = f_bit_add(this.h[5], f);
    this.h[6] = f_bit_add(this.h[6], g);
    this.h[7] = f_bit_add(this.h[7], h);
  }
  // 返回hash值
  to_hex(){
    return this.h.map(f_bit_to_hex).join("");
  }
}

export default Sha256;
