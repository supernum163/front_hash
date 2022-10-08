import Test from "../test.js";
import sha3_224_str from "../../src/sha3/sha3_224_str.js";
import sha3_224_blob from "../../src/sha3/sha3_224_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha3/sha3_224_str.js";
test.assert("6b4e03423667dbb73b6e15454f0eb1abd4597f9a1b078e3f5b5a6bc7", sha3_224_str, "");
test.assert("c338f9c8ff3d0ba2917697dc06ad6c7ea6d247a6f2fd6f9e881a22d3", sha3_224_str, "abc一二三");
test.assert("19b911b3de002dc5330ed9b4f2fa02fad4d999077e0a04a6b9fb68b5", sha3_224_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("a8813fc5b94aebdca26f1978e958974664b564645d9a85570859f85f", sha3_224_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha3/sha3_224_blob.js";
await test.assert("6b4e03423667dbb73b6e15454f0eb1abd4597f9a1b078e3f5b5a6bc7", sha3_224_blob, new Blob([""]));
await test.assert("c338f9c8ff3d0ba2917697dc06ad6c7ea6d247a6f2fd6f9e881a22d3", sha3_224_blob, new Blob(["abc一二三"]));
await test.assert("19b911b3de002dc5330ed9b4f2fa02fad4d999077e0a04a6b9fb68b5", sha3_224_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("a8813fc5b94aebdca26f1978e958974664b564645d9a85570859f85f", sha3_224_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
