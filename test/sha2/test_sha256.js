import Test from "../test.js";
import sha256_str from "../../src/sha2/sha256_str.js";
import sha256_blob from "../../src/sha2/sha256_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha2/sha256_str.js";
test.assert("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", sha256_str, "");
test.assert("9220d31be226f093852925b5cb2066b4443ac8c0f52f2b0ad70510a89fc09f99", sha256_str, "abc一二三");
test.assert("a740fad6e28888da6628c9640a68248c1d6e682e3e430731ae19b374647139f7", sha256_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha2/sha256_blob.js";
await test.assert("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", sha256_blob, new Blob([""]));
await test.assert("9220d31be226f093852925b5cb2066b4443ac8c0f52f2b0ad70510a89fc09f99", sha256_blob, new Blob(["abc一二三"]));
await test.assert("a740fad6e28888da6628c9640a68248c1d6e682e3e430731ae19b374647139f7", sha256_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
