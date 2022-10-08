import Test from "../test.js";
import md5_str from "../../src/md5/md5_str.js";
import md5_blob from "../../src/md5/md5_blob.js";
import { Blob } from 'buffer';

const test = new Test();

test.fp = "/src/md5/md5_str.js";
test.assert("d41d8cd98f00b204e9800998ecf8427e", md5_str, "");
test.assert("7253d93293c0bfcecf99220e9e840311", md5_str, "abc一二三");
test.assert("c67db910d2655a4e7f1a9c0e12774bd8", md5_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/md5/md5_blob.js";
await test.assert("d41d8cd98f00b204e9800998ecf8427e", md5_blob, new Blob([""]));
await test.assert("7253d93293c0bfcecf99220e9e840311", md5_blob, new Blob(["abc一二三"]));
await test.assert("c67db910d2655a4e7f1a9c0e12774bd8", md5_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");

