import Test from "../test.js";
import sha384_str from "../../src/sha2/sha384_str.js";
import sha384_blob from "../../src/sha2/sha384_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha2/sha384_str.js";
test.assert("38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b", sha384_str, "");
test.assert("ea0fb15897400b8046a039dbf3a49db97abe93d03407ab95fb1815a5a8b6d7298533a807c35c37be62179d75513de696", sha384_str, "abc一二三");
test.assert("bb2afcd49de97c23896c4a16e73a2463bbea59f4b3deefccc8f4ed37efce2f772cdf08f719ae0016354e161494164903", sha384_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("7a5c7abf57c8534a6083c780285a0ba16b2b2a7da9d1946d482b5b8bd7d0b1c9164c9ca776950777c25c7a74f50d41a4", sha384_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha2/sha384_blob.js";
await test.assert("38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b", sha384_blob, new Blob([""]));
await test.assert("ea0fb15897400b8046a039dbf3a49db97abe93d03407ab95fb1815a5a8b6d7298533a807c35c37be62179d75513de696", sha384_blob, new Blob(["abc一二三"]));
await test.assert("bb2afcd49de97c23896c4a16e73a2463bbea59f4b3deefccc8f4ed37efce2f772cdf08f719ae0016354e161494164903", sha384_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("7a5c7abf57c8534a6083c780285a0ba16b2b2a7da9d1946d482b5b8bd7d0b1c9164c9ca776950777c25c7a74f50d41a4", sha384_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
