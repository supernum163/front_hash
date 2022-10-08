import Test from "../test.js";
import blake2b_160_str from "../../src/blake2/blake2b_160_str.js";
import blake2b_160_blob from "../../src/blake2/blake2b_160_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/blake2/blake2b_160_str.js";
test.assert("3345524abf6bbe1809449224b5972c41790b6cf2", blake2b_160_str, "");
test.assert("606dc2bde75f7adf8da08652832ebe1afb6f7833", blake2b_160_str, "abc一二三");
test.assert("bb637aec89388e7dcc3be75b46b34da0c69e9edc", blake2b_160_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("9cd01633d8fde5bcc890ad7ae50ee14f4a832110", blake2b_160_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.assert("8525e8e917395341e3b94050a104614d2496b66d", blake2b_160_str, ["", "abc"]);
test.assert("e2774b49ce64f1b4a1839b83df352f970c36acb4", blake2b_160_str, ["abc一二三", "abc"]);
test.assert("7757ee98736ff554a2111606d2d20dc7740da189", blake2b_160_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);
test.assert("aacbdf9d4d1af909f1ca60ec32dae41aecc456f1", blake2b_160_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);

test.fp = "/src/blake2/blake2b_160_blob.js";
await test.assert("3345524abf6bbe1809449224b5972c41790b6cf2", blake2b_160_blob, new Blob([""]));
await test.assert("606dc2bde75f7adf8da08652832ebe1afb6f7833", blake2b_160_blob, new Blob(["abc一二三"]));
await test.assert("bb637aec89388e7dcc3be75b46b34da0c69e9edc", blake2b_160_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("9cd01633d8fde5bcc890ad7ae50ee14f4a832110", blake2b_160_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");

