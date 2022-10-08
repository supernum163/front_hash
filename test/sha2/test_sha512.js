import Test from "../test.js";
import sha512_str from "../../src/sha2/sha512_str.js";
import sha512_blob from "../../src/sha2/sha512_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha2/sha512_str.js";
test.assert("cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e", sha512_str, "");
test.assert("a2d4d55d3560bcfeb0b2273978ada223a2e661779252af44934ec2c3e603caad770100d1ab7cd49d48bb92762ee3fce2c6ede4f320c1ee9084b5479e64f36790", sha512_str, "abc一二三");
test.assert("8d5afde8de84b1d9f42be6c346e49195a790c9ba896cec4506328b9991996291f0adffb7cf54f23cc4692ef30f8ebc96f172fd5a9f153ee1ea975ffedc13168e", sha512_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("ab3514e4deecc770ac1a7015b1b94410d820a7aa220c32da3e38ed78a3c7595921f559a2f8c825dfa758e0f9a7189997402b470c5407410537bee5db79d634ae", sha512_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha2/sha512_blob.js";
await test.assert("cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e", sha512_blob, new Blob([""]));
await test.assert("a2d4d55d3560bcfeb0b2273978ada223a2e661779252af44934ec2c3e603caad770100d1ab7cd49d48bb92762ee3fce2c6ede4f320c1ee9084b5479e64f36790", sha512_blob, new Blob(["abc一二三"]));
await test.assert("8d5afde8de84b1d9f42be6c346e49195a790c9ba896cec4506328b9991996291f0adffb7cf54f23cc4692ef30f8ebc96f172fd5a9f153ee1ea975ffedc13168e", sha512_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("ab3514e4deecc770ac1a7015b1b94410d820a7aa220c32da3e38ed78a3c7595921f559a2f8c825dfa758e0f9a7189997402b470c5407410537bee5db79d634ae", sha512_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
