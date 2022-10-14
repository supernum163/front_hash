// import Scrypt from "../src/scrypt/scrypt.js";
// import crypto from 'crypto'; 
// import { f_bit_to_hex_x8 } from "../src/utils.js"
// const log_x8 = (arr) => {
//   return arr.map(f_bit_to_hex_x8).join("");
// };

// const scrypt = new Scrypt();
// let r = log_x8(scrypt.scrypt("password", "NaCl", 16, 8, 1, 64));
// crypto.scrypt("password", "NaCl", 64, { N:16, r:8, p:1 }, (err, derivedKey) => {
//   let d = derivedKey.toString('hex');
//   console.log(r, d); 
//   console.log(r == d);
// });
