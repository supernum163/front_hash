import Test from "../test.js";
import blake2s_160_str from "../../src/blake2/blake2s_160_str.js";
import blake2s_160_blob from "../../src/blake2/blake2s_160_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "../../src/blake2/blake2s_160_str.js";
test.assert("354c9c33f735962418bdacb9479873429c34916f", blake2s_160_str, "");
test.assert("882c72b5fdcc0a3f5d9d8ff39af3d708a284caab", blake2s_160_str, "abc一二三");
test.assert("11019ded533a265b871ebe39e70e8518bd63b73a", blake2s_160_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("c3d337a27560d365437ac8c1c1019e9197f99d29", blake2s_160_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.assert("6f5ca2369952c1965d89013464100fa039b2b4e8", blake2s_160_str, ["", "abc"]);
test.assert("e22c4ea6788bc3f71b12d3f9a1e09c9d7ef14987", blake2s_160_str, ["abc一二三", "abc"]);
test.assert("41aa55364f5e4383421658e28facdf6ff5683d33", blake2s_160_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);
test.assert("ea36d13cf464f3c87950ecd65c184b2dc6e59661", blake2s_160_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);

test.fp = "../../src/blake2/blake2s_160_blob.js";
await test.assert("354c9c33f735962418bdacb9479873429c34916f", blake2s_160_blob, new Blob([""]));
await test.assert("882c72b5fdcc0a3f5d9d8ff39af3d708a284caab", blake2s_160_blob, new Blob(["abc一二三"]));
await test.assert("11019ded533a265b871ebe39e70e8518bd63b73a", blake2s_160_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("c3d337a27560d365437ac8c1c1019e9197f99d29", blake2s_160_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");

