import Test from "../test.js";
import sha1_str from "../../src/sha1/sha1_str.js";
import sha1_blob from "../../src/sha1/sha1_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha1/sha1_str.js";
test.assert("da39a3ee5e6b4b0d3255bfef95601890afd80709", sha1_str, "");
test.assert("6f8fae0ba06fe0647774de04f0bc7123fe0afd38", sha1_str, "abc一二三");
test.assert("d9b4c9aca3eff74a69330008757161e06f345853", sha1_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha1/sha1_blob.js";
await test.assert("da39a3ee5e6b4b0d3255bfef95601890afd80709", sha1_blob, new Blob([""]));
await test.assert("6f8fae0ba06fe0647774de04f0bc7123fe0afd38", sha1_blob, new Blob(["abc一二三"]));
await test.assert("d9b4c9aca3eff74a69330008757161e06f345853", sha1_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));


console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
