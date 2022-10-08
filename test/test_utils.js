import Test from "./test.js"
import * as UTILS from "../src/utils.js"


const test = new Test("/src/utils.js");

test.assert("11110010 00000000 00000000 00000000", UTILS.f_bit_to_str_10_x32, 0xF2);
test.assert("10000010 00010001 11110011 00101001 00010001 10100000 01011010 01110000", UTILS.f_bit_to_str_01_x64, [[0x8211f329, 0x11a05a70]]);
test.assert([0, 1], UTILS.f_bit_and_x64, [[1, 1], [2, 1]]);
test.assert([3, 1], UTILS.f_bit_or_x64, [[1, 1], [2, 1]]);
test.assert([3, 0], UTILS.f_bit_xor_x64, [[1, 1], [2, 1]]);
test.assert([-2, -1], UTILS.f_bit_not_x64, [[1, 0]]);
test.assert([0xE, 0], UTILS.f_bit_shift_left_x64, [[0xF0000000, 0xE0000000], 4]);
test.assert([0, -268435456], UTILS.f_bit_shift_right_x64, [[0xF, 0xE], 4]);
test.assert([7498852, 562036736], UTILS.f_bit_rotate_right_x64, [[0x726c6421, 0x80000000], 8]);
test.assert([0x21, 0x10], UTILS.f_bit_add_x64, [[0xF, 0xE], [0x12, 0x2]]);
test.assert([0xE83C2A67 | 0, 0x87C92F8D | 0], UTILS.f_bit_add_x64, [[0xADCC6CD1, 0x17414A0C], [0x3A6FBD96, 0x7087E581]]);
test.assert([0x10000001 | 0, 0x10000000 | 0], UTILS.f_bit_add_x64, [[0xF0000000, 0xF0000000], [0x20000000, 0x20000000]]);
test.assert([0x30000001 | 0, 0x30000000 | 0], UTILS.f_bit_add_x64, [[0xF0000000, 0xF0000000], [0x40000000, 0x40000000]]);
test.assert([0x70000001 | 0, 0x70000000 | 0], UTILS.f_bit_add_x64, [[0xF0000000, 0xF0000000], [0x80000000, 0x80000000]]);
test.assert([0xC0000001 | 0, 0x00000000 | 0], UTILS.f_bit_add_x64, [[0xC0000000, 0xFFF00000], [0x00000000, 0x00100000]]);
test.assert([0x80000000 | 0, 0x00000000 | 0], UTILS.f_bit_add_x64, [[0x7FFFFFFF, 0xFFF00000], [0x00000000, 0x00100000]]);


console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");

