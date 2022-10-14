
import { 
  f_hex_to_bit_x8 as f_hex_to_bit,
  f_bit_rotate_left_x32 as f_bit_rotate,
  f_bit_add_x32 as f_bit_add,
  new_array, f_mod, f_bit_to_hex_x8, f_bit_to_hex_01_x32
} from "../utils.js"
import hmac from "./hmac.js";
import { pdkdf2 } from "./pbkdf.js";
import sha256_str from "../sha2/sha256_str.js";

import crypto from 'crypto'; 


class Scrypt {
  log_bytes(bytes) {
    console.log(bytes.map(f_bit_to_hex_x8).join(""));
  };
  log_words(words) {
    console.log(words.map(f_bit_to_hex_01_x32).join(", "));
  };
  bytes_to_words(bytes) {
    let words = new_array(Math.ceil(bytes.length / 4));
    for (let i in bytes) {
      let j = parseInt(i / 4);
      let k = (i % 4) * 8;
      words[j] = words[j] ^ (bytes[i] << k);
    }
    return words;
  }
  words_to_bytes(words) {
    let bytes = [];
    for (let w of words) {
      for (let i = 0; i < 4; i++) {
        bytes.push(w & 0xFF);
        w = w >>> 8;
      }
    }
    return bytes;
  }
  words_xor(X, Y) {
    return new_array(X.length).map((e, i) => X[i] ^ Y[i]);
  }
  // output, input 都必须是16个32bit数值组成的数组
  salsa(input) {
    let x = Array.from(input);
    let output = Array.from(input);
    for (let i = 8; i > 0; i -= 2) {
      x[ 4] ^= f_bit_rotate(f_bit_add(x[ 0], x[12]),  7); 
      x[ 8] ^= f_bit_rotate(f_bit_add(x[ 4], x[ 0]),  9);
      x[12] ^= f_bit_rotate(f_bit_add(x[ 8], x[ 4]), 13); 
      x[ 0] ^= f_bit_rotate(f_bit_add(x[12], x[ 8]), 18);
      x[ 9] ^= f_bit_rotate(f_bit_add(x[ 5], x[ 1]),  7); 
      x[13] ^= f_bit_rotate(f_bit_add(x[ 9], x[ 5]),  9);
      x[ 1] ^= f_bit_rotate(f_bit_add(x[13], x[ 9]), 13); 
      x[ 5] ^= f_bit_rotate(f_bit_add(x[ 1], x[13]), 18);
      x[14] ^= f_bit_rotate(f_bit_add(x[10], x[ 6]),  7); 
      x[ 2] ^= f_bit_rotate(f_bit_add(x[14], x[10]),  9);
      x[ 6] ^= f_bit_rotate(f_bit_add(x[ 2], x[14]), 13); 
      x[10] ^= f_bit_rotate(f_bit_add(x[ 6], x[ 2]), 18);
      x[ 3] ^= f_bit_rotate(f_bit_add(x[15], x[11]),  7); 
      x[ 7] ^= f_bit_rotate(f_bit_add(x[ 3], x[15]),  9);
      x[11] ^= f_bit_rotate(f_bit_add(x[ 7], x[ 3]), 13); 
      x[15] ^= f_bit_rotate(f_bit_add(x[11], x[ 7]), 18);
      x[ 1] ^= f_bit_rotate(f_bit_add(x[ 0], x[ 3]),  7); 
      x[ 2] ^= f_bit_rotate(f_bit_add(x[ 1], x[ 0]),  9);
      x[ 3] ^= f_bit_rotate(f_bit_add(x[ 2], x[ 1]), 13); 
      x[ 0] ^= f_bit_rotate(f_bit_add(x[ 3], x[ 2]), 18);
      x[ 6] ^= f_bit_rotate(f_bit_add(x[ 5], x[ 4]),  7); 
      x[ 7] ^= f_bit_rotate(f_bit_add(x[ 6], x[ 5]),  9);
      x[ 4] ^= f_bit_rotate(f_bit_add(x[ 7], x[ 6]), 13); 
      x[ 5] ^= f_bit_rotate(f_bit_add(x[ 4], x[ 7]), 18);
      x[11] ^= f_bit_rotate(f_bit_add(x[10], x[ 9]),  7); 
      x[ 8] ^= f_bit_rotate(f_bit_add(x[11], x[10]),  9);
      x[ 9] ^= f_bit_rotate(f_bit_add(x[ 8], x[11]), 13); 
      x[10] ^= f_bit_rotate(f_bit_add(x[ 9], x[ 8]), 18);
      x[12] ^= f_bit_rotate(f_bit_add(x[15], x[14]),  7); 
      x[13] ^= f_bit_rotate(f_bit_add(x[12], x[15]),  9);
      x[14] ^= f_bit_rotate(f_bit_add(x[13], x[12]), 13); 
      x[15] ^= f_bit_rotate(f_bit_add(x[14], x[13]), 18);
    }
    for (let i in input) output[i] = f_bit_add(x[i], input[i]);
    return output;
  }
  block_mix(B, r) {
    // let r = parseInt(input.length / 32);
    let n = 2 * r - 1;
    let X = B.slice(n * 16, n * 16 + 16);
    let Y = [];
    for (let i = 0; i <= n; i++) {
      let b = B.slice(i * 16, i * 16 + 16);
      let T = this.words_xor(X, b);
      Y[i] = X = this.salsa(T);
    }
    let output = [];
    for (let i = 0; i < Y.length; i+=2) output = output.concat(Y[i]);
    for (let i = 1; i < Y.length; i+=2) output = output.concat(Y[i]);
    return output;
  }
  ro_mix(B, r, N) {
    if (B.length != 32 * r) {
      throw new Error("B.length does not match r blocks")
    } else if (N <= 1 || N > 2 ** (128 * r / 8) || Math.log2(N) % 1 != 0) {
      throw new Error("N must be larger than 1, a power of 2, and less than 2^(128 * r / 8)")
    }
    let V = new_array(N);
    let X = Array.from(B);
    for (let i = 0; i < N; i++) {
      V[i] = X;
      X = this.block_mix(X, r);
    }
    for (let i = 0; i < N; i++) {
      let j = f_mod(X[X.length - 16], N);
      let T = this.words_xor(X, V[j]);
      X = this.block_mix(T, r);
    }
    return X;
  }
  HMAC_SHA256(P, S) {
    let r = hmac(sha256_str, P, S, 64);
    return f_hex_to_bit(r);
  }
  PBKDF2_HMAC_SHA256(P, S, c, dk_len) {
    return pdkdf2(this.HMAC_SHA256, P, S, c, dk_len, 32);
  }
  scrypt(P, S, N = 16, r = 8, p = 1, dk_len = 64) {
    let r_x_128 = r * 128;
    let B = this.PBKDF2_HMAC_SHA256(P, S, 1, p * r_x_128);
    let B_ = [];
    for (let i = 0; i < p; i++) {
      let b = this.bytes_to_words(B.splice(0, r_x_128));
      let words = this.ro_mix(b, r, N);
      B_ = B_.concat(this.words_to_bytes(words));
    }
    let R = this.PBKDF2_HMAC_SHA256(P, B_, 1, dk_len);
    return R;
  }
  debug() {
    // 计算hmac-sha256
    const hmac = crypto.createHmac('sha256', "passwd").update("salt\x00\x00\x00\x01");
    let Hmac = hmac.digest('bytes');
    console.log(Hmac.toString('hex'))
    // 计算pbkdf2
    crypto.pbkdf2('passwd', 'NaCl', 80, 64, 'sha256', (err, derivedKey) => { 
      console.log(derivedKey.toString('hex')); 
    });
    // 计算scrypt
    crypto.scrypt("password", "NaCl", 64, 
           { N:16, r:2, p:1 }, (err, derivedKey) => {
      console.log(derivedKey.toString('hex')); 
    });
  }
}

export default Scrypt;
