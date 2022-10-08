import Hash_x32  from "../hash_x32.js";
import { 
  f_bit_add_x32 as f_bit_add, 
  f_bit_to_hex_10_x32 as f_bit_to_hex, 
  f_bit_rotate_left_x32 as f_bit_rotate_left,
  new_array, 
} from "../utils.js";

// 核心实现类
class Md5 extends Hash_x32 {
  constructor(){
    super(64, 64);
    // 正弦常量K，左移常量S，数据索引常量X
    this.K = [
      0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 
      0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 
      0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 
      0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 
      0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 
      0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 
      0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 
      0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391, 
    ];
    this.S = [
      7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,
      5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,
      4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,
      6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,
    ],
    this.X = [
      0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
      1,  6, 11,  0,  5, 10, 15,  4,  9, 14,  3,  8, 13,  2,  7, 12,
      5,  8, 11, 14,  1,  4,  7, 10,  13,  0,  3,  6,  9, 12, 15,  2,
      0,  7, 14,  5, 12,  3, 10,  1,  8, 15,  6, 13,  4, 11,  2,  9,
    ]
    this.reset();
  }
  reset(){
    super.reset();
    this.a = 0x67452301;
    this.b = 0xEFCDAB89;
    this.c = 0x98BADCFE;
    this.d = 0x10325476;
  }
  get_K() {
    let K = new_array(64);
    for (let i = 0; i < 64; i++) {
      K[i] = parseInt(4294967296 * Math.abs(Math.sin(i + 1)));
    }
  }
  get_X() {
    let X = new_array(64);
    for (let i = 0; i < 64; i++) {
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
      x = f_bit_add(this.M[this.X[i]], x);
      x = f_bit_add(this.K[i], x);
      x = f_bit_rotate_left(x, this.S[i]);
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
