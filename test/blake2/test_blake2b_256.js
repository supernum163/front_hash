import Test from "../test.js";
import blake2b_256_str from "../../src/blake2/blake2b_256_str.js";
import blake2b_256_blob from "../../src/blake2/blake2b_256_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/blake2/blake2b_256_str.js";
test.assert("0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8", blake2b_256_str, "");
test.assert("4d89a529ad2e9ab859da2d1beeb638bbe5137cfc68a6bdd4fb4a904bf8ffd94e", blake2b_256_str, "abc一二三");
test.assert("2982994905b1bae2e9d96e3e9ed855cf46abcb4247763bb48d4e7d7fce1193a1", blake2b_256_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("fbcd727da71d90366ae02035d6a52149a2ea9a0a4445086a25e41dc8ba8f986b", blake2b_256_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.assert("7a78f9455f438d36794c4adcf1a499856367dd403ceb8e9ca14a19a173b8f07b", blake2b_256_str, ["", "abc"]);
test.assert("af9e2629b4c63801b034a9b79d8ff2b08224d26eae507d9bdf6f35382a5dd6d1", blake2b_256_str, ["abc一二三", "abc"]);
test.assert("a3d55285af47fc30a90a25d3480e383fc6c0b4dc098c9fa8fa758abed3d844e5", blake2b_256_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);
test.assert("43f4b41fff8160efe20e080ed5eb1e55d9b2f746df4512b0d1c43e3a2ad06057", blake2b_256_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);

test.fp = "/src/blake2/blake2b_256_blob.js";
await test.assert("0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8", blake2b_256_blob, new Blob([""]));
await test.assert("4d89a529ad2e9ab859da2d1beeb638bbe5137cfc68a6bdd4fb4a904bf8ffd94e", blake2b_256_blob, new Blob(["abc一二三"]));
await test.assert("2982994905b1bae2e9d96e3e9ed855cf46abcb4247763bb48d4e7d7fce1193a1", blake2b_256_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("fbcd727da71d90366ae02035d6a52149a2ea9a0a4445086a25e41dc8ba8f986b", blake2b_256_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");

