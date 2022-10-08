import Test from "../test.js"
import blake2s_224_str from "../../src/blake2/blake2s_224_str.js";
import blake2s_224_blob from "../../src/blake2/blake2s_224_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "../../src/blake2/blake2s_224_str.js";
test.assert("1fa1291e65248b37b3433475b2a0dd63d54a11ecc4e3e034e7bc1ef4", blake2s_224_str, "");
test.assert("313dbbcfc1d083bfd953384c11a5ddc9dd4692384ffa841c32d87f4a", blake2s_224_str, "abc一二三");
test.assert("eb238db506b242b9b09c2169ac9cb0db1d1e60b823b6b4085cdd7fed", blake2s_224_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("a401188ba26b3a17e76414bf4e5c93e3596a1953fa41e2e62702e3d9", blake2s_224_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.assert("4b2265333dd9752f90b0b6ba85c4475d0dc1266b91af3a7930d109aa", blake2s_224_str, ["", "abc"]);
test.assert("8e226abbf0ee083af8eb43ff6c3011bbcc4c41866a7ae46809c6bd79", blake2s_224_str, ["abc一二三", "abc"]);
test.assert("388a15bc697b2cd7bdf197f961961c3da6a6ce56fdd055e80cc67010", blake2s_224_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);
test.assert("e8fdaa693c487a34b969510e8ed91993cab01ba7545abf158fbce9f9", blake2s_224_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);

test.fp = "../../src/blake2/blake2s_224_blob.js";
await test.assert("1fa1291e65248b37b3433475b2a0dd63d54a11ecc4e3e034e7bc1ef4", blake2s_224_blob, new Blob([""]));
await test.assert("313dbbcfc1d083bfd953384c11a5ddc9dd4692384ffa841c32d87f4a", blake2s_224_blob, new Blob(["abc一二三"]));
await test.assert("eb238db506b242b9b09c2169ac9cb0db1d1e60b823b6b4085cdd7fed", blake2s_224_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("a401188ba26b3a17e76414bf4e5c93e3596a1953fa41e2e62702e3d9", blake2s_224_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");

