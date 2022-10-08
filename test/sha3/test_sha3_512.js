import Test from "../test.js";
import sha3_512_str from "../../src/sha3/sha3_512_str.js";
import sha3_512_blob from "../../src/sha3/sha3_512_blob.js";
import { Blob } from "buffer";

const test = new Test();

test.fp = "/src/sha3/sha3_512_str.js";
test.assert("a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26", sha3_512_str, "");
test.assert("389054d9b602afb12951c13378b9b0d7023001f221a4860bcea9db81dd6329d93f3f0a1b7e682d6f1264f78b264c5975a21d0fa1d4267099ab3b2a0ceb6fa3d0", sha3_512_str, "abc一二三");
test.assert("237b5a79421c4f4050209be5ab0b80dd0d25c2e0b35f097e70d4578c15a73e2fe3ff2bb37cb6a222c208e94f24c9a5db23b7d5e99c836dbc2fb53ee06528b81e", sha3_512_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
`);
test.assert("65c5205029457e56977a50e889c6765c924f36433239ee27ce8b5d808e667335d335ff950f43f37a2b01889cf6cce4d1928b517a92fe37d8143ea1ba8f070982", sha3_512_str, `
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`);

test.fp = "/src/sha3/sha3_512_blob.js";
await test.assert("a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26", sha3_512_blob, new Blob([""]));
await test.assert("389054d9b602afb12951c13378b9b0d7023001f221a4860bcea9db81dd6329d93f3f0a1b7e682d6f1264f78b264c5975a21d0fa1d4267099ab3b2a0ceb6fa3d0", sha3_512_blob, new Blob(["abc一二三"]));
await test.assert("237b5a79421c4f4050209be5ab0b80dd0d25c2e0b35f097e70d4578c15a73e2fe3ff2bb37cb6a222c208e94f24c9a5db23b7d5e99c836dbc2fb53ee06528b81e", sha3_512_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));
await test.assert("65c5205029457e56977a50e889c6765c924f36433239ee27ce8b5d808e667335d335ff950f43f37a2b01889cf6cce4d1928b517a92fe37d8143ea1ba8f070982", sha3_512_blob, new Blob([`
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
  零一二三四五六七八九十
  十九八七六五四三二一零
`]));

console.log(import.meta.url.replace(/^.*front_hash/, ''), " 测试完毕\n");
