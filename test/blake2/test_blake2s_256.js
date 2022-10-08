import Test from "../test.js";
import blake2s_256_str from "../../src/blake2/blake2s_256_str.js";
import blake2s_256_blob from "../../src/blake2/blake2s_256_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "../../src/blake2/blake2s_256_str.js";
test.assert("69217a3079908094e11121d042354a7c1f55b6482ca1a51e1b250dfd1ed0eef9", blake2s_256_str, "");
test.assert("194ea618cecf60b12bdccdb1a04ade385feac0f23cec991b232962fdf8b0342b", blake2s_256_str, "abc一二三");
test.assert("7afbeabc019072835fd926a0298c885c8e0b738219442393a10cbeab7cb49e2c", blake2s_256_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("a3147b43add315e97a550a268e00c9c67dd11a3ba0ca41752133d4075a794529", blake2s_256_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.assert("876aba8e91478ebd72760663bf0e5da59b19ea288227bb8599b497bbb6572276", blake2s_256_str, ["", "abc"]);
test.assert("63af55d6cc5c1395515093a95a9eb79f0d04f24673dee71262959f2307be51d8", blake2s_256_str, ["abc一二三", "abc"]);
test.assert("9beb3fc03df3d2b57ad7ed94e336cfc2945cce8bd111a5edc4c8f1150ffc0381", blake2s_256_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);
test.assert("0f0a974c0672169d383c4cfd4f989ee1f20897358da4b65ea232789abe0a9058", blake2s_256_str, [`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`, "abc"]);

test.fp = "../../src/blake2/blake2s_256_blob.js";
await test.assert("69217a3079908094e11121d042354a7c1f55b6482ca1a51e1b250dfd1ed0eef9", blake2s_256_blob, new Blob([""]));
await test.assert("194ea618cecf60b12bdccdb1a04ade385feac0f23cec991b232962fdf8b0342b", blake2s_256_blob, new Blob(["abc一二三"]));
await test.assert("7afbeabc019072835fd926a0298c885c8e0b738219442393a10cbeab7cb49e2c", blake2s_256_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("a3147b43add315e97a550a268e00c9c67dd11a3ba0ca41752133d4075a794529", blake2s_256_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");

