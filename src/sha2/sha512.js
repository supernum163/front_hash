import Hash_x64 from "../hash_x64.js";
import {
  f_bit_and_x64 as f_bit_and,
  f_bit_not_x64 as f_bit_not,
  f_bit_xor_x64 as f_bit_xor,
  f_bit_add_x64 as f_bit_add,
  f_bit_rotate_right_x64 as f_bit_rotate_right,
  f_bit_shift_right_x64 as f_bit_shift_right,
  f_bit_to_hex_01_x64 as f_bit_to_hex,
  new_array,
} from "../utils.js";

class Sha512 extends Hash_x64 {
  constructor(H){
    super(128, 80);
    this.M = this.M.map(e => new_array(2));
    this.H = H || [
      [0x6a09e667, 0xf3bcc908], [0xbb67ae85, 0x84caa73b], 
	    [0x3c6ef372, 0xfe94f82b], [0xa54ff53a, 0x5f1d36f1], 
      [0x510e527f, 0xade682d1], [0x9b05688c, 0x2b3e6c1f], 
	    [0x1f83d9ab, 0xfb41bd6b], [0x5be0cd19, 0x137e2179], 
    ];
    this.h = new_array(8);
    this.K = [
      [0x428a2f98, 0xd728ae22], [0x71374491, 0x23ef65cd], 
      [0xb5c0fbcf, 0xec4d3b2f], [0xe9b5dba5, 0x8189dbbc], 
      [0x3956c25b, 0xf348b538], [0x59f111f1, 0xb605d019], 
      [0x923f82a4, 0xaf194f9b], [0xab1c5ed5, 0xda6d8118], 
      [0xd807aa98, 0xa3030242], [0x12835b01, 0x45706fbe], 
      [0x243185be, 0x4ee4b28c], [0x550c7dc3, 0xd5ffb4e2], 
      [0x72be5d74, 0xf27b896f], [0x80deb1fe, 0x3b1696b1], 
      [0x9bdc06a7, 0x25c71235], [0xc19bf174, 0xcf692694], 
      [0xe49b69c1, 0x9ef14ad2], [0xefbe4786, 0x384f25e3], 
      [0x0fc19dc6, 0x8b8cd5b5], [0x240ca1cc, 0x77ac9c65], 
      [0x2de92c6f, 0x592b0275], [0x4a7484aa, 0x6ea6e483], 
      [0x5cb0a9dc, 0xbd41fbd4], [0x76f988da, 0x831153b5], 
      [0x983e5152, 0xee66dfab], [0xa831c66d, 0x2db43210], 
      [0xb00327c8, 0x98fb213f], [0xbf597fc7, 0xbeef0ee4], 
      [0xc6e00bf3, 0x3da88fc2], [0xd5a79147, 0x930aa725], 
      [0x06ca6351, 0xe003826f], [0x14292967, 0x0a0e6e70], 
      [0x27b70a85, 0x46d22ffc], [0x2e1b2138, 0x5c26c926], 
      [0x4d2c6dfc, 0x5ac42aed], [0x53380d13, 0x9d95b3df], 
      [0x650a7354, 0x8baf63de], [0x766a0abb, 0x3c77b2a8], 
      [0x81c2c92e, 0x47edaee6], [0x92722c85, 0x1482353b], 
      [0xa2bfe8a1, 0x4cf10364], [0xa81a664b, 0xbc423001], 
      [0xc24b8b70, 0xd0f89791], [0xc76c51a3, 0x0654be30], 
      [0xd192e819, 0xd6ef5218], [0xd6990624, 0x5565a910], 
      [0xf40e3585, 0x5771202a], [0x106aa070, 0x32bbd1b8], 
      [0x19a4c116, 0xb8d2d0c8], [0x1e376c08, 0x5141ab53], 
      [0x2748774c, 0xdf8eeb99], [0x34b0bcb5, 0xe19b48a8], 
      [0x391c0cb3, 0xc5c95a63], [0x4ed8aa4a, 0xe3418acb], 
      [0x5b9cca4f, 0x7763e373], [0x682e6ff3, 0xd6b2b8a3], 
      [0x748f82ee, 0x5defb2fc], [0x78a5636f, 0x43172f60], 
      [0x84c87814, 0xa1f0ab72], [0x8cc70208, 0x1a6439ec], 
      [0x90befffa, 0x23631e28], [0xa4506ceb, 0xde82bde9], 
      [0xbef9a3f7, 0xb2c67915], [0xc67178f2, 0xe372532b], 
      [0xca273ece, 0xea26619c], [0xd186b8c7, 0x21c0c207], 
      [0xeada7dd6, 0xcde0eb1e], [0xf57d4f7f, 0xee6ed178], 
      [0x06f067aa, 0x72176fba], [0x0a637dc5, 0xa2c898a6], 
      [0x113f9804, 0xbef90dae], [0x1b710b35, 0x131c471b], 
      [0x28db77f5, 0x23047d84], [0x32caab7b, 0x40c72493], 
      [0x3c9ebe0a, 0x15c9bebc], [0x431d67c4, 0x9c100d4c], 
      [0x4cc5d4be, 0xcb3e42b6], [0x597f299c, 0xfc657e2a], 
      [0x5fcb6fab, 0x3ad6faec], [0x6c44198c, 0x4a475817], 
    ];
    this.reset();
  }
  reset(){
    super.reset();
    this.h = Array.from(this.H);
  }
  // 基本函数
  Ch(x, y, z){ 
    let a = f_bit_and(x, y);
    let b = f_bit_not(x);
    let c = f_bit_and(b, z);
    return f_bit_xor(a, c);
  }
  Maj(x, y, z){ 
    let a = f_bit_and(x, y);
    let b = f_bit_and(x, z);
    let c = f_bit_and(y, z);
    return f_bit_xor(f_bit_xor(a, b), c);
  }
  Sigma0(x){
    let a = f_bit_rotate_right(x, 28);
    let b = f_bit_rotate_right(x, 34);
    let c = f_bit_rotate_right(x, 39);
    return f_bit_xor(f_bit_xor(a, b), c);
  }
  Sigma1(x){
    let a = f_bit_rotate_right(x, 14);
    let b = f_bit_rotate_right(x, 18);
    let c = f_bit_rotate_right(x, 41);
    return f_bit_xor(f_bit_xor(a, b), c);
  }
  sigma0(x){
    let a = f_bit_rotate_right(x, 1);
    let b = f_bit_rotate_right(x, 8);
    let c = f_bit_shift_right(x, 7);
    return f_bit_xor(f_bit_xor(a, b), c);
  }
  sigma1(x){
    let a = f_bit_rotate_right(x, 19);
    let b = f_bit_rotate_right(x, 61);
    let c = f_bit_shift_right(x, 6);
    return f_bit_xor(f_bit_xor(a, b), c);
  }
  // 单次更新四个标准幻数
  exec(data){
    let i, x, y, z;
    this.M.map(e => e.fill(0));
    for (i = 0; i < 128; i+=8) {
      x = data[i   ] << 24 | data[i + 1] << 16 | data[i + 2] << 8 | data[i + 3];
      y = data[i + 4] << 24 | data[i + 5] << 16 | data[i + 6] << 8 | data[i + 7];
      z = parseInt(i / 8);
      this.M[z] = [x, y];
    }
    if (this.status === 1) {
      let [x, y] = super.get_length();
      this.M[15] = y;
      this.M[14] = x;
      this.status = 2;
    }
    for (i = 16; i < 80; i++) {
      x = this.sigma1(this.M[i-2])
      y = f_bit_add(x, this.M[i-7])
      z = f_bit_add(y, this.sigma0(this.M[i-15]))
      this.M[i] = f_bit_add(z, this.M[i-16])
    }
    let [a,b,c,d,e,f,g,h] = this.h;
    for (i = 0; i < 80; i++) {
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

export default Sha512;
  