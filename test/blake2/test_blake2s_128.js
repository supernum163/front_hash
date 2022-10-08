import Test from "../test.js";
import blake2s_128_str from "../../src/blake2/blake2s_128_str.js";
import blake2s_128_blob from "../../src/blake2/blake2s_128_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "../../src/blake2/blake2s_128_str.js";
test.assert("64550d6ffe2c0a01a14aba1eade0200c", blake2s_128_str, "");
test.assert("bb2967f36739addfdf212523bc479f7c", blake2s_128_str, "abc一二三");
test.assert("ff3bb0e8d2b4901bf65b86124bc3c2b9", blake2s_128_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("9787cc156238298e96a6be6ebcdc5d5a", blake2s_128_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.assert("b97402a52243a0c4857d305f2ef028ee", blake2s_128_str, ["", "abc"]);
test.assert("0022c3d53903f9cfa89a9f508b6d2fb6", blake2s_128_str, ["abc一二三", "abc"]);
test.assert("18f7aa3d4b4b5b2a3e48a6a7f9804712", blake2s_128_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);
test.assert("6b8cbba4062315b518a7728fb125bed7", blake2s_128_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);

test.fp = "../../src/blake2/blake2s_128_blob.js";
await test.assert("64550d6ffe2c0a01a14aba1eade0200c", blake2s_128_blob, new Blob([""]));
await test.assert("bb2967f36739addfdf212523bc479f7c", blake2s_128_blob, new Blob(["abc一二三"]));
await test.assert("ff3bb0e8d2b4901bf65b86124bc3c2b9", blake2s_128_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("9787cc156238298e96a6be6ebcdc5d5a", blake2s_128_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");

