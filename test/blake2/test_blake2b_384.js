import Test from "../test.js";
import blake2b_384_str from "../../src/blake2/blake2b_384_str.js";
import blake2b_384_blob from "../../src/blake2/blake2b_384_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/blake2/blake2b_384_str.js";
test.assert("b32811423377f52d7862286ee1a72ee540524380fda1724a6f25d7978c6fd3244a6caf0498812673c5e05ef583825100", blake2b_384_str, "");
test.assert("13a0c720cc081b0181cc043bafb92a01ce34380511ddaed31df6340179fea05e4c96e32c8d112f8a095ad75cfb0c9f2e", blake2b_384_str, "abc一二三");
test.assert("df2346945a50678c7e7721f2afaccaa140427ab301eb292f69f4ce8c99a085a0c8f025540778c0f7cebbce8a7968403f", blake2b_384_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("9a322a49e5c8fca9a13ba00985887417f04078b971bdc195b163e3206a7c0049eb7bfcb4cba24c2d1c74c2645ccce675", blake2b_384_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.assert("831eda720d6c36f29ad70b438585e2ea2106eea0102aa494e6ae6a5f5d13087eb24bf1dbf249d4d2ff2bcbd0bcb6458d", blake2b_384_str, ["", "abc"]);
test.assert("05002e2eaf2a62d71f4eaf217a9d32b44e695e6c6e88376748562477c31924b430248957cc7b0a1b8d00261bee894e75", blake2b_384_str, ["abc一二三", "abc"]);
test.assert("faa059283026e4dcee1fe242bae3987b5527b22f6b926ef00f68f713e1873c8a4978b7f075f2deaf5e9bc74e850d02eb", blake2b_384_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);
test.assert("d1996d42c955006dea18e38a424f6993ff8b8991954fbaf557d2ea1533750e5429f190264339bcc35d720dd2fcda3c52", blake2b_384_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);

test.fp = "/src/blake2/blake2b_384_blob.js";
await test.assert("b32811423377f52d7862286ee1a72ee540524380fda1724a6f25d7978c6fd3244a6caf0498812673c5e05ef583825100", blake2b_384_blob, new Blob([""]));
await test.assert("13a0c720cc081b0181cc043bafb92a01ce34380511ddaed31df6340179fea05e4c96e32c8d112f8a095ad75cfb0c9f2e", blake2b_384_blob, new Blob(["abc一二三"]));
await test.assert("df2346945a50678c7e7721f2afaccaa140427ab301eb292f69f4ce8c99a085a0c8f025540778c0f7cebbce8a7968403f", blake2b_384_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("9a322a49e5c8fca9a13ba00985887417f04078b971bdc195b163e3206a7c0049eb7bfcb4cba24c2d1c74c2645ccce675", blake2b_384_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");

