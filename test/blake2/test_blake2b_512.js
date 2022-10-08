import Test from "../test.js";
import blake2b_512_str from "../../src/blake2/blake2b_512_str.js";
import blake2b_512_blob from "../../src/blake2/blake2b_512_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/blake2/blake2b_512_str.js";
test.assert("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce", blake2b_512_str, "");
test.assert("d3312543cf3c9231aa48af6a6b3d27451a2e68aac8fd83c487d784e363a0874313927c2118fb52551b3bcff9ce37f9f92c18f3b71fbeddba83c34e977d787b3b", blake2b_512_str, "abc一二三");
test.assert("895e1b2c9dd8047401de0398ec585b324ac091e6d18ed3e5ad5ccb50e66d3f38601444cb0585b752a5e86a473bb6a062222a62b37384d93315f902bff9cb13ea", blake2b_512_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("f3cd0e7861bb381248e81488fcd085588d3cdcfe34d13e9da5be4c21aaf067996d402c5e9378216e482857cbe33f13323b7c3d974259be4edd4be305b0c1625f", blake2b_512_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.assert("91cc35fc51ce734eae9e57a20725d68062b0bd6de1965a4b5dc5eb4d60402d02d00b5079b0907775e317fd84a149634253c9d1fd01819e202729affbf47b00e5", blake2b_512_str, ["", "abc"]);
test.assert("d445d6547f8f78a9d68853474734c76a383c719e777ce0b3e09418f5644c1a0265ed79c1b546b50c28c5a80d05503026dfcdcb9cf39dcd681e5110240d6ea511", blake2b_512_str, ["abc一二三", "abc"]);
test.assert("85f2621f88f5d9d76affc4ec7830def8c83281f0c63f94415d794405956f2e306252a0993ab1cd3f55bf14577881be3cdddeb54f6f6bf67541628bd2d48ec8e3", blake2b_512_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);
test.assert("97ad2d3f9725e7711c589960284541fab419cf7a72757691315dc5c84b750b62244a35116cc4182e18b950a4577f3c7cf11e1974e4dd492ed2dfe868268756d9", blake2b_512_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);

test.fp = "/src/blake2/blake2b_512_blob.js";
await test.assert("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce", blake2b_512_blob, new Blob([""]));
await test.assert("d3312543cf3c9231aa48af6a6b3d27451a2e68aac8fd83c487d784e363a0874313927c2118fb52551b3bcff9ce37f9f92c18f3b71fbeddba83c34e977d787b3b", blake2b_512_blob, new Blob(["abc一二三"]));
await test.assert("895e1b2c9dd8047401de0398ec585b324ac091e6d18ed3e5ad5ccb50e66d3f38601444cb0585b752a5e86a473bb6a062222a62b37384d93315f902bff9cb13ea", blake2b_512_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("f3cd0e7861bb381248e81488fcd085588d3cdcfe34d13e9da5be4c21aaf067996d402c5e9378216e482857cbe33f13323b7c3d974259be4edd4be305b0c1625f", blake2b_512_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");

