import Hash_x64 from "../hash_x64.js";
import { HEX, new_array, f_utf8_enc } from "../utils.js";

class Blake2 extends Hash_x64 {
  constructor(w, nn, key) {
    super(w * 2, 16);
    if (w === 64) {
      this.w = 64n;
      this.word_bytes = 8;
      this.word_length = 16;
      this.word_revert = 0xFFFFFFFFFFFFFFFFn;
      this.r = 12;
      this.bb = 128n;
      this.R = [32n, 24n, 16n, 63n];
      // IV[i] = floor(2**w * frac(sqrt(prime(i+1))))
      this.IV = [
        0x6a09e667f3bcc908n, 0xbb67ae8584caa73bn, 
        0x3c6ef372fe94f82bn, 0xa54ff53a5f1d36f1n, 
        0x510e527fade682d1n, 0x9b05688c2b3e6c1fn, 
        0x1f83d9abfb41bd6bn, 0x5be0cd19137e2179n, 
      ];
    } else if (w === 32) {
      this.w = 32n;
      this.word_bytes = 4;
      this.word_length = 8;
      this.word_revert = 0xFFFFFFFFn;
      this.r = 10;
      this.bb = 64n;
      this.R = [16n, 12n, 8n, 7n];
      this.IV = [
        0x6a09e667n, 0xbb67ae85n, 
        0x3c6ef372n, 0xa54ff53an, 
        0x510e527fn, 0x9b05688cn, 
        0x1f83d9abn, 0x5be0cd19n, 
      ];
    } else {
      throw new Error("Blake2.w must be one of [64, 32]");
    }
    this.bignum = 2n ** this.w;
    if (typeof(nn) === "number" && nn >= 1 && nn <= w && nn % 1 === 0) {
      this.nn = BigInt(nn);
      this.output_length = nn * 2;
    } else {
      throw new Error("Blake2.nn must be an integer between 1 and w")
    }
    this.SIGMA = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
      [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
      [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
      [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
      [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
      [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
      [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
      [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
      [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0],
    ]
    this.h = new_array(8);
    this.V = new_array(16);
    this.reset();
    this.set_key(key);
  }
  reset() {
    super.reset();
    this.i = 0n;
    this.h = Array.from(this.IV);
    // 默认不设置key，kk = 0
    this.h[0] = this.h[0] ^ 0x01010000n ^ this.nn;
  }
  set_key(key) {
    if (!key) {
      this.kk = 0n;
    } else if (typeof(key) === "string") {
      key = key.replace(/\r\n/g, "\n");
      key = f_utf8_enc(key);
      this.kk = BigInt(key.length);
      this.h[0] = this.h[0] ^ (this.kk << 8n);
      if (key.length > this.batch_size) {
        console.warn(`Size of Blake2.key is larger than ${this.batch_size}, exceeding bits will be ignored`);
        key.length = this.batch_size;
      } else if (key.length < this.batch_size) {
        key = key.concat(new_array(this.batch_size - key.length));
      }
      this.data = key;
    } else {
      throw new Error("Blake2.key should be a string");
    }
  }
  loop_right(num, n) {
    return (num >> n) ^ (num << (this.w - n)) % this.bignum;
  }
  G(a, b, c, d, x, y) {
    this.V[a] = (this.V[a] + this.V[b] + this.M[x]) % this.bignum;
    this.V[d] = this.loop_right(this.V[d] ^ this.V[a], this.R[0]);
    this.V[c] = (this.V[c] + this.V[d]) % this.bignum;
    this.V[b] = this.loop_right(this.V[b] ^ this.V[c], this.R[1]);
    this.V[a] = (this.V[a] + this.V[b] + this.M[y]) % this.bignum;
    this.V[d] = this.loop_right(this.V[d] ^ this.V[a], this.R[2]);
    this.V[c] = (this.V[c] + this.V[d]) % this.bignum;
    this.V[b] = this.loop_right(this.V[b] ^ this.V[c], this.R[3]);
  }
  F(t, f) {
    this.V.splice(0, 16, ...this.h, ...this.IV);
    this.V[12] = this.V[12] ^ (t % this.bignum);
    this.V[13] = this.V[13] ^ (t >> this.w);
    if (f) this.V[14] = this.V[14] ^ this.word_revert;
    for (let i = 0; i < this.r; i++) {
      let s = this.SIGMA[i % 10];
      this.G(0, 4, 8, 12, s[0], s[1]);
      this.G(1, 5, 9, 13, s[2], s[3]);
      this.G(2, 6, 10, 14, s[4], s[5]);
      this.G(3, 7, 11, 15, s[6], s[7]);
      this.G(0, 5, 10, 15, s[8], s[9]);
      this.G(1, 6, 11, 12, s[10], s[11]);
      this.G(2, 7, 8, 13, s[12], s[13]);
      this.G(3, 4, 9, 14, s[14], s[15]);
    }
    for (let i = 0; i < 8; i++) {
      this.h[i] = this.h[i] ^ this.V[i] ^ this.V[i + 8];
    }
  }
  padding() { }
  bits_to_words(data) {
    this.M.fill(0n);
    for (let i in data) {
      let j = (i % this.word_bytes) * 8;
      let k = parseInt(i / this.word_bytes);
      this.M[k] = this.M[k] | (BigInt(data[i]) << BigInt(j));
    }
  }
  exec(data) {
    this.bits_to_words(data);
    if (this.status === 0) {
      this.F(++this.i * this.bb, false);
    } else {
      if (this.kk === 0n) {
        this.F(BigInt(this.length), true);
      } else {
        this.F(BigInt(this.length) + this.bb, true);
      }
      this.status = 2;
    }
  }
  num_to_hex_01(num) {
    let arr = [];
    while (num != 0n) {
      arr.push(HEX[num & 0xFn]);
      num = num >> 4n;
    }
    let len_pad0 = this.word_length - arr.length;
    if (len_pad0 > 0) arr = arr.concat(new_array(len_pad0, '0'));
    return arr.reverse().join("");
  }
  num_to_hex_10(num) {
    let arr = [];
    while (num != 0n) {
      arr.push(HEX[num >> 4n & 0xFn]);
      arr.push(HEX[num & 0xFn]);
      num = num >> 8n;
    }
    let len_pad0 = this.word_length - arr.length;
    if (len_pad0 > 0) arr = arr.concat(new_array(len_pad0, '0'));
    return arr.join("");
  }
  to_hex() {
    let r = "";
    for (let h of this.h) {
      r += this.num_to_hex_10(h);
      if (r.length >= this.output_length) { 
        return r.substr(0, this.output_length);
      }
    }
    return r;
  }
  log(arr, n_per_line = 3) {
    let v = arr.map(this.num_to_hex_01.bind(this));
    while (v.length > 0) {
      console.log(v.splice(0, n_per_line).join(" "))
    }
  }
  log_V() { this.log(this.V); }
  log_M() { this.log(this.M); }
  log_H() { this.log(this.h); }
}

export default Blake2;
