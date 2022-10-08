import Test from "../test.js";
import shake_256_str from "../../src/sha3/shake_256_str.js";
import shake_256_blob from "../../src/sha3/shake_256_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha3/shake_256_str.js";
test.assert("46b9dd2b0ba88d13233b3feb743eeb243fcd52ea62b81b82b50c27646ed5762f", shake_256_str, "");
test.assert("2da9e1b99c22f1e21b194b96bb5556728f7b1b21e36b4d05bc1170d1231dc507", shake_256_str, "abc一二三");
test.assert("13253dd4cc941ffa17a393a09c955455b22ab4039181ef5b5dfd3f5872a72792", shake_256_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("a6713ec5e5a45e10c854beecb1d71966442d41725b4d0cc986e602faf14252a2", shake_256_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha3/shake_256_blob.js";
await test.assert("46b9dd2b0ba88d13233b3feb743eeb243fcd52ea62b81b82b50c27646ed5762f", shake_256_blob, new Blob([""]));
await test.assert("2da9e1b99c22f1e21b194b96bb5556728f7b1b21e36b4d05bc1170d1231dc507", shake_256_blob, new Blob(["abc一二三"]));
await test.assert("13253dd4cc941ffa17a393a09c955455b22ab4039181ef5b5dfd3f5872a72792", shake_256_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("a6713ec5e5a45e10c854beecb1d71966442d41725b4d0cc986e602faf14252a2", shake_256_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
