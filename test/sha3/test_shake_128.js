import Test from "../test.js";
import shake_128_str from "../../src/sha3/shake_128_str.js";
import shake_128_blob from "../../src/sha3/shake_128_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha3/shake_128_str.js";
test.assert("7f9c2ba4e88f827d616045507605853e", shake_128_str, "");
test.assert("efdac8769bbacef4e940eea63a1f9ecc", shake_128_str, "abc一二三");
test.assert("7ecceeca1e34ef8d3805ceec011c0682", shake_128_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("161a55a1e79b1ee7ad654f38f66226d5", shake_128_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha3/shake_128_blob.js";
await test.assert("7f9c2ba4e88f827d616045507605853e", shake_128_blob, new Blob([""]));
await test.assert("efdac8769bbacef4e940eea63a1f9ecc", shake_128_blob, new Blob(["abc一二三"]));
await test.assert("7ecceeca1e34ef8d3805ceec011c0682", shake_128_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("161a55a1e79b1ee7ad654f38f66226d5", shake_128_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
