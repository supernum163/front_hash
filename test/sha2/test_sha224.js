import Test from "../test.js";
import sha224_str from "../../src/sha2/sha224_str.js";
import sha224_blob from "../../src/sha2/sha224_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha2/sha224_str.js";
test.assert("d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f", sha224_str, "");
test.assert("945edc5c26f38b1dea382ffd78db9ac628c6e629561bc2199ae23cbe", sha224_str, "abc一二三");
test.assert("bbdbbb4df8f0b177f23354e07c7a0c471e87a3cdb3d1c501d575b46c", sha224_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha2/sha224_blob.js";
await test.assert("d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f", sha224_blob, new Blob([""]));
await test.assert("945edc5c26f38b1dea382ffd78db9ac628c6e629561bc2199ae23cbe", sha224_blob, new Blob(["abc一二三"]));
await test.assert("bbdbbb4df8f0b177f23354e07c7a0c471e87a3cdb3d1c501d575b46c", sha224_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
