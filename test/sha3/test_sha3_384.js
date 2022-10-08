import Test from "../test.js";
import sha3_384_str from "../../src/sha3/sha3_384_str.js";
import sha3_384_blob from "../../src/sha3/sha3_384_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha3/sha3_384_str.js";
test.assert("0c63a75b845e4f7d01107d852e4c2485c51a50aaaa94fc61995e71bbee983a2ac3713831264adb47fb6bd1e058d5f004", sha3_384_str, "");
test.assert("6a86491b71f8f23063793d5c101dbe2c72f9f1cd663a869603fd9dfbacec4bbe2c3e66539afe3556d8b8f6efeff3f571", sha3_384_str, "abc一二三");
test.assert("b59b68370e73bb47346062e9465ce12bcbde13cb343612ec3a3892744d29b44cbac1534ba9fe34c2da4b893ebbe344ac", sha3_384_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("c1deaa11a4104277d282af40d0bbd8621529878e741c200c2ccaba41951f03d330102a4fc9d7a70fa8fecdc035f534b9", sha3_384_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha3/sha3_384_blob.js";
await test.assert("0c63a75b845e4f7d01107d852e4c2485c51a50aaaa94fc61995e71bbee983a2ac3713831264adb47fb6bd1e058d5f004", sha3_384_blob, new Blob([""]));
await test.assert("6a86491b71f8f23063793d5c101dbe2c72f9f1cd663a869603fd9dfbacec4bbe2c3e66539afe3556d8b8f6efeff3f571", sha3_384_blob, new Blob(["abc一二三"]));
await test.assert("b59b68370e73bb47346062e9465ce12bcbde13cb343612ec3a3892744d29b44cbac1534ba9fe34c2da4b893ebbe344ac", sha3_384_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("c1deaa11a4104277d282af40d0bbd8621529878e741c200c2ccaba41951f03d330102a4fc9d7a70fa8fecdc035f534b9", sha3_384_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
