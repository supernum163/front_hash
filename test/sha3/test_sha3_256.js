import Test from "../test.js";
import sha3_256_str from "../../src/sha3/sha3_256_str.js";
import sha3_256_blob from "../../src/sha3/sha3_256_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha3/sha3_256_str.js";
test.assert("a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a", sha3_256_str, "");
test.assert("885e9aeb1f1fe6602c92c3ffa4ef166c90c08b06ac2af8c13fa2ca9b79ff4ea7", sha3_256_str, "abc一二三");
test.assert("88753b45dd32abfeb82db42175a14d23c0f9c321fb629aad52d88d9e52fa3cd3", sha3_256_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("603f20e97493ad452257de8a2df87c19f7117f47c23ea3ea531afc277278c06d", sha3_256_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha3/sha3_256_blob.js";
await test.assert("a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a", sha3_256_blob, new Blob([""]));
await test.assert("885e9aeb1f1fe6602c92c3ffa4ef166c90c08b06ac2af8c13fa2ca9b79ff4ea7", sha3_256_blob, new Blob(["abc一二三"]));
await test.assert("88753b45dd32abfeb82db42175a14d23c0f9c321fb629aad52d88d9e52fa3cd3", sha3_256_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("603f20e97493ad452257de8a2df87c19f7117f47c23ea3ea531afc277278c06d", sha3_256_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
