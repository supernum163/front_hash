// md5
import md5_str from "./md5/md5_str.js";
// sha1
import sha1_str from "./sha1/sha1_str.js";
// sha2
import sha256_str from "./sha2/sha256_str.js";
import sha224_str from "./sha2/sha224_str.js";
import sha384_str from "./sha2/sha384_str.js";
import sha512_str from "./sha2/sha512_str.js";
import sha512_224_str from "./sha2/sha512_224_str.js";
import sha512_256_str from "./sha2/sha512_256_str.js";
// sha3
import sha3_224_str from "./sha3/sha3_224_str.js";
import sha3_256_str from "./sha3/sha3_256_str.js";
import sha3_384_str from "./sha3/sha3_384_str.js";
import sha3_512_str from "./sha3/sha3_512_str.js";
import shake_128_str from "./sha3/shake_128_str.js";
import shake_256_str from "./sha3/shake_256_str.js";
// blake2
import blake2b_160_str from "./blake2/blake2b_160_str.js";
import blake2b_256_str from "./blake2/blake2b_256_str.js";
import blake2b_384_str from "./blake2/blake2b_384_str.js";
import blake2b_512_str from "./blake2/blake2b_512_str.js";
import blake2s_128_str from "./blake2/blake2s_128_str.js";
import blake2s_160_str from "./blake2/blake2s_160_str.js";
import blake2s_224_str from "./blake2/blake2s_224_str.js";
import blake2s_256_str from "./blake2/blake2s_256_str.js";

// md5
import md5_blob from "./md5/md5_blob.js";
// sha1
import sha1_blob from "./sha1/sha1_blob.js";
// sha2
import sha256_blob from "./sha2/sha256_blob.js";
import sha224_blob from "./sha2/sha224_blob.js";
import sha384_blob from "./sha2/sha384_blob.js";
import sha512_blob from "./sha2/sha512_blob.js";
import sha512_224_blob from "./sha2/sha512_224_blob.js";
import sha512_256_blob from "./sha2/sha512_256_blob.js";
// sha3
import sha3_224_blob from "./sha3/sha3_224_blob.js";
import sha3_256_blob from "./sha3/sha3_256_blob.js";
import sha3_384_blob from "./sha3/sha3_384_blob.js";
import sha3_512_blob from "./sha3/sha3_512_blob.js";
import shake_128_blob from "./sha3/shake_128_blob.js";
import shake_256_blob from "./sha3/shake_256_blob.js";
// blake2
import blake2b_160_blob from "./blake2/blake2b_160_blob.js";
import blake2b_256_blob from "./blake2/blake2b_256_blob.js";
import blake2b_384_blob from "./blake2/blake2b_384_blob.js";
import blake2b_512_blob from "./blake2/blake2b_512_blob.js";
import blake2s_128_blob from "./blake2/blake2s_128_blob.js";
import blake2s_160_blob from "./blake2/blake2s_160_blob.js";
import blake2s_224_blob from "./blake2/blake2s_224_blob.js";
import blake2s_256_blob from "./blake2/blake2s_256_blob.js";

window.FRONT_HASH = {
  // 计算字符串hash
  md5_str,
  sha1_str,
  sha256_str,
  sha224_str,
  sha384_str,
  sha512_str,
  sha512_224_str,
  sha512_256_str,
  sha3_224_str,
  sha3_256_str,
  sha3_384_str,
  sha3_512_str,
  shake_128_str,
  shake_256_str,
  blake2b_160_str,
  blake2b_256_str,
  blake2b_384_str,
  blake2b_512_str,
  blake2s_128_str,
  blake2s_160_str,
  blake2s_224_str,
  blake2s_256_str,
  // 计算文件hash
  md5_blob,
  sha1_blob,
  sha256_blob,
  sha224_blob,
  sha384_blob,
  sha512_blob,
  sha512_224_blob,
  sha512_256_blob,
  sha3_224_blob,
  sha3_256_blob,
  sha3_384_blob,
  sha3_512_blob,
  shake_128_blob,
  shake_256_blob,
  blake2b_160_blob,
  blake2b_256_blob,
  blake2b_384_blob,
  blake2b_512_blob,
  blake2s_128_blob,
  blake2s_160_blob,
  blake2s_224_blob,
  blake2s_256_blob,
}

export default FRONT_HASH;
