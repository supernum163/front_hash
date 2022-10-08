import Hash_x32  from "../hash_x32.js";
import { 
  f_bit_add_x32 as f_bit_add, 
  f_bit_to_hex_10_x32 as f_bit_to_hex, 
  f_bit_rotate_left_x32 as f_bit_rotate_left, 
} from "../utils.js";

// 左移常量表
const S_mat = [
  [7, 12, 17, 22],
  [5, 9, 14, 20],
  [4, 11, 16, 23],
  [6, 10, 15, 21],
];

// 正弦常量K，左移常量S，数据索引常量X
const K = [];
const S = [];
const X = [];
for (let i = 0; i < 64; i++) {
  K[i] = parseInt(4294967296 * Math.abs(Math.sin(i + 1)));
  let x = parseInt(i / 16);
  let y = i % 4;
  S[i] = S_mat[x][y];
  if (i < 16) {
    X[i] = i;
  } else if (i < 32) {
    X[i] = (i * 5 + 1) % 16;
  } else if (i < 48) {
    X[i] = (i * 3 + 5) % 16;
  } else {
    X[i] = (i * 7) % 16;
  }
}

// 核心实现类
class Md5 extends Hash_x32 {
  constructor(){
    super(64, 64);
    this.reset();
  }
  reset(){
    super.reset();
    this.a = 0x67452301;
    this.b = 0xEFCDAB89;
    this.c = 0x98BADCFE;
    this.d = 0x10325476;
  }
  // 四个非线性函数
  F(x, y, z){ 
    return (x & y) | ((~x) & z) 
  }
  G(x, y, z){ 
    return (x & z) | (y & (~z)) 
  }
  H(x, y, z){ 
    return x ^ y ^ z 
  }
  I(x, y, z){ 
    return y ^ (x | (~z)) 
  }
  // 单次更新四个标准幻数
  exec(data){
    let i, x, y;
    this.M.fill(0);
    for (i = 0; i < 64; i++) {
      x = parseInt(i / 4);
      y = i % 4 * 8;
      this.M[x] = this.M[x] | (data[i] << y);
    }
    if (this.status === 1) {
      this.M[14] = this.length << 3;
      this.M[15] = this.length >>> 29;
      this.status = 2;
    }
    let a = this.a;
    let b = this.b;
    let c = this.c;
    let d = this.d;
    for (i = 0; i < 64; i++) {
      if (i < 16) {
        x = this.F(b, c, d);
      } else if (i < 32) {
        x = this.G(b, c, d);
      } else if (i < 48) {
        x = this.H(b, c, d);
      } else {
        x = this.I(b, c, d);
      }
      x = f_bit_add(a, x);
      x = f_bit_add(this.M[X[i]], x);
      x = f_bit_add(K[i], x);
      x = f_bit_rotate_left(x, S[i]);
      x = f_bit_add(b, x);
      y = d;
      d = c;
      c = b;
      b = x;
      a = y;
    }
    this.a = f_bit_add(this.a, a);
    this.b = f_bit_add(this.b, b);
    this.c = f_bit_add(this.c, c);
    this.d = f_bit_add(this.d, d);
  }
  // 返回hash值
  to_hex(){
    return f_bit_to_hex(this.a) + f_bit_to_hex(this.b) + 
        f_bit_to_hex(this.c) + f_bit_to_hex(this.d);
  }
}

export default Md5;
