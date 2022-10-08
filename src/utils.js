// 标准16进制数
const HEX = [
  "0", "1", "2", "3", 
  "4", "5", "6", "7", 
  "8", "9", "a", "b", 
  "c", "d", "e", "f"
];


const new_array = (n, e = 0) => Array(n).fill(e);
const new_matrix = (n, m, e = 0) => Array(n).fill(0).map(i => new_array(m, e));
const new_cube = (n, m, l, e = 0) => Array(n).fill(0).map(i => new_matrix(m, l, e));

// 使用func循环打印参数
const f_bit_log = function(func){
  return (...args) => console.log([...args].map(func));
}

// 将字符串按utf8编码格式加密成二进制bits
const f_utf8_enc = (s) => {
  var r = [];
  for (let i = 0; i < s.length; i++) {
    let c = s.charCodeAt(i);
    if (c < 128) {
      r.push(c);
    } else if (c < 2048) {
      r.push((c >>> 6) | 192);
      r.push((c & 63) | 128);
    } else {
      r.push((c >>> 12) | 224);
      r.push(((c >>> 6) & 63) | 128);
      r.push((c & 63) | 128);
    }
  }
  return r;
}


// 循环左移（超出 w bit 的比特位回到右侧）
const f_bit_rotate_left_x32 = (bit, n) => {
  return (bit << n) | (bit >>> (32 - n));
}
// 循环右移（超出 w bit 的比特位回到左侧）
const f_bit_rotate_right_x32 = (bit, n) => {
  return (bit >>> n) | (bit << (32 - n));
}

// 按位相加（超出32bit的比特位舍弃）
const f_bit_add_x32 = (x, y) => {
  let x8 = x & 0x80000000;
  let y8 = y & 0x80000000;
  let flag = x8 ^ y8
  let x4 = x & 0x40000000;
  let y4 = y & 0x40000000;
  let r = (x & 0x3FFFFFFF) + (y & 0x3FFFFFFF);
  if (x4 & y4) {
    return r ^ 0x80000000 ^ flag;     // 需要直接进位
  } else if (x4 | y4) {
    if (r & 0x40000000) {
      return r ^ 0xC0000000 ^ flag;   // 需要与结果中的大数位结合后进位
    } else {
      return r ^ 0x40000000 ^ flag;   // 不需要进位，但需要加上之前的大数位
    }
  } else {
    return r ^ flag;            // 不需要进位，也不需要加上大数位
  }
}

// 将二进制Byte转化为16进制字符串
const f_bit_to_hex_x8 = (Byte) => {
  return HEX[Byte >>> 4 & 0xF] + HEX[Byte & 0xF];
}

// 将二进制bits转化为16进制字符串（小端模式）
const f_bit_to_hex_10_x32 = (bit) => {
  var r = new_array(8, "0");
  let i = 0;
  while (bit !== 0 && i < 7) {
    r[i] = HEX[bit >>> 4 & 0xF];
    r[i + 1] = HEX[bit & 0xF];
    bit = bit >>> 8;
    i += 2;
  }
  return r.join("");
}
// 将二进制bits转化为16进制字符串（大端模式）
const f_bit_to_hex_01_x32 = (bit) => {
  var r = new_array(8, "0");
  for (let i = 7; i >= 0; i--) {
    r[i] = HEX[bit & 0xF];
    bit = bit >>> 4;
  }
  return r.join("");
}
// 将二进制bits转化为01表示的字符串（小端模式）
const f_bit_to_str_10_x32 = (bit) => {
  var r = new_matrix(4, 8, "0");
  for (let i = 0; i < 32; i++) {
    let x = parseInt(i / 8);
    let y = 7 - i % 8;
    r[x][y] = HEX[bit & 0x1];
    bit = bit >>> 1;
  }
  r = r.map(e => e.join(""));
  return r.join(" ");
}
// 将二进制bits转化为01表示的字符串（大端模式）
const f_bit_to_str_01_x32 = (bit) => {
  var r = new_matrix(4, 8, "0");
  for (let i = 31; i >= 0; i--) {
    let x = parseInt(i / 8);
    let y = i % 8;
    r[x][y] = HEX[bit & 0x1];
    bit = bit >>> 1;
  }
  r = r.map(e => e.join(""));
  return r.join(" ");
}


// 将字符串表示的64位数值转化为两个32位数值
const f_str_to_x64 = (s) => {
  let x = ('0x' + s.substr(8,8)) | 0;
  let y = ('0x' + s.substr(0,8)) | 0;
  return [x, y];
}

// 注意js中的数值精度只有16位（2^53 - 1），所以64位数值必须用BigInt才能避免失真
const f_x64_to_x32 = (bigint) => {
  let x = bigint >> 32n;
  let y = bigint & 0xFFFFFFFFn;
  return [x, y].map(Number);
}

// 64位与
const f_bit_and_x64 = (bit1, bit2) => {
  return [bit1[0] & bit2[0], bit1[1] & bit2[1]];
}
// 64位或
const f_bit_or_x64 = (bit1, bit2) => {
  return [bit1[0] | bit2[0], bit1[1] | bit2[1]];
}
// 64位非
const f_bit_not_x64 = (bit) => {
  return [~bit[0], ~bit[1]];
}
// 64位异或
const f_bit_xor_x64 = (bit1, bit2) => {
  return [bit1[0] ^ bit2[0], bit1[1] ^ bit2[1]];
}

// 64位左移
const f_bit_shift_left_x64 = (bit, n) => {
  if (n > 32) {
    return [bit[1] << (n - 32), 0];
  } else {
    return [bit[0] << n | bit[1] >>> (32 - n), bit[1] << n];
  }
}
// 64位右移
const f_bit_shift_right_x64 = (bit, n) => {
  if (n > 32) {
    return [0, bit[0] >>> (n - 32)];
  } else {
    return [bit[0] >>> n, bit[0] << (32 - n) | bit[1] >>> n];
  }
}

// 循环左移（超出 w bit 的比特位回到右侧）
const f_bit_rotate_left_x64 = (bit, n) => {
  if (n > 32) {
    return f_bit_rotate_right_x64(bit, 64 - n)
  } else {
    let m = 32 - n;
    return [bit[0] << n | bit[1] >>> m, bit[1] << n | bit[0] >>> m];
  }
}
// 循环右移（超出 w bit 的比特位回到左侧）
const f_bit_rotate_right_x64 = (bit, n) => {
  if (n > 32) {
    return f_bit_rotate_left_x64(bit, 64 - n)
  } else {
    let m = 32 - n;
    return [bit[1] << m | bit[0] >>> n, bit[0] << m | bit[1] >>> n];
  }
}

// 按位相加（超出32bit的比特位舍弃）
const f_bit_add_x64 = (bit1, bit2) => {
  let x8, y8, x8_xor_y8, x4, y4, x4_and_y4, x4_or_y4, r0, r1, r_carry, carry_1
  // 末尾32bit相加
  x8 = bit1[1] & 0x80000000;
  y8 = bit2[1] & 0x80000000;
  x8_xor_y8 = x8 ^ y8;
  x4 = bit1[1] & 0x40000000;
  y4 = bit2[1] & 0x40000000;
  x4_and_y4 = (x4 & y4);
  x4_or_y4 = (x4 | y4);
  r1 = (bit1[1] & 0x3FFFFFFF) + (bit2[1] & 0x3FFFFFFF);
  r_carry = r1 & 0x40000000
  carry_1 = (x8 & y8) || ((x8 | y8) && ((x4_and_y4) || (x4_or_y4 && r_carry)));
  if (x4_and_y4) {
    r1 = r1 ^ 0x80000000 ^ x8_xor_y8;
  } else if (x4_or_y4) {
    if (r_carry) {
      r1 = r1 ^ 0xC0000000 ^ x8_xor_y8;
    } else {
      r1 = r1 ^ 0x40000000 ^ x8_xor_y8;
    }
  } else {
    r1 = r1 ^ x8_xor_y8;
  }
  // 首位32bit相加
  x8 = bit1[0] & 0x80000000;
  y8 = bit2[0] & 0x80000000;
  x8_xor_y8 = x8 ^ y8;
  x4 = bit1[0] & 0x40000000;
  y4 = bit2[0] & 0x40000000;
  x4_and_y4 = (x4 & y4);
  x4_or_y4 = (x4 | y4);
  r0 = (bit1[0] & 0x3FFFFFFF) + (bit2[0] & 0x3FFFFFFF);
  if (carry_1) r0++;
  r_carry = r0 & 0x40000000
  if (x4_and_y4) {
    r0 = r0 ^ 0x80000000 ^ x8_xor_y8;
  } else if (x4_or_y4) {
    if (r_carry) {
      r0 = r0 ^ 0xC0000000 ^ x8_xor_y8;
    } else {
      r0 = r0 ^ 0x40000000 ^ x8_xor_y8;
    }
  } else {
    r0 = r0 ^ x8_xor_y8;
  }
  return [r0, r1];
}

// 将二进制bits转化为16进制字符串（小端模式）
const f_bit_to_hex_10_x64 = (bit) => {
  return f_bit_to_hex_10_x32(bit[1]) + f_bit_to_hex_10_x32(bit[0]);
}
// 将二进制bits转化为16进制字符串（大端模式）
const f_bit_to_hex_01_x64 = (bit) => {
  return f_bit_to_hex_01_x32(bit[0]) + f_bit_to_hex_01_x32(bit[1]);
}
// 将二进制bits转化为字符串（小端模式）
const f_bit_to_str_10_x64 = (bit) => {
  return f_bit_to_str_10_x32(bit[1]) + ' ' + f_bit_to_str_10_x32(bit[0]);
}
// 将二进制bits转化为字符串（大端模式）
const f_bit_to_str_01_x64 = (bit) => {
  return f_bit_to_str_01_x32(bit[0]) + ' ' + f_bit_to_str_01_x32(bit[1]);
}


export {
  HEX,
  new_array,
  new_matrix,
  new_cube,
  f_bit_log,
  f_utf8_enc,
  f_bit_rotate_left_x32,
  f_bit_rotate_right_x32,
  f_bit_add_x32,
  f_bit_to_hex_x8,
  f_bit_to_hex_10_x32,
  f_bit_to_hex_01_x32,
  f_bit_to_str_10_x32,
  f_bit_to_str_01_x32,
  f_str_to_x64,
  f_x64_to_x32,
  f_bit_and_x64,
  f_bit_or_x64,
  f_bit_not_x64,
  f_bit_xor_x64,
  f_bit_shift_left_x64,
  f_bit_shift_right_x64,
  f_bit_rotate_left_x64,
  f_bit_rotate_right_x64,
  f_bit_add_x64,
  f_bit_to_hex_10_x64,
  f_bit_to_hex_01_x64,
  f_bit_to_str_10_x64,
  f_bit_to_str_01_x64,
}
