
# Front Hash


## 使用前端语言计算hash值

Hash值即数据的散列值，可以用于给明文密码加密，给数据、文件进行数字签名等。相比于服务器端计算hash值，使用前端语言计算hash值的优势在于，其可以有效的避免网络传输过程中数据泄露，数据谬误等问题。

这个项目的目标就是使用JavaScript实现常用hash值算法，既可以用于计算字符串的hash值（如用户输入的密码等），也可以用于计算blob的hash值（如用户上传的文件等）。


## 使用方法

首先需要引入本项目中的js文件： **/dist/front_hash.bundle.js** ，引入后 **FRONT_HASH** 将成为全局变量，其中包含了全部的hash值计算函数。

```javascript
// 计算字符串hash值
let hash_from_str = FRONT_HASH.md5_str("abc");
console.log(hash_from_str);

// 计算文件hash值
// 假设html文件中有有如下文件输入标签，且有文件输入
// <input id="file_input" type="file" placeholder="点击选择文件">
const file_input = document.getElementById("file_input");
const file = file_input.files[0];
let hash_from_blob = await FRONT_HASH.md5_blob(file);
console.log(hash_from_blob);
```

更详细的示例请参考本项目中的 **/dist/example/**


## 可用函数

|        | 计算字符串的hash值         | 计算blob的hash值            | 最大输入长度（字节）|
|:------ |:------------------------- |:--------------------------- |:----------------- |
| md5    | md5_str(s)                | md5_blob(blob)              | 2 ** 32 - 1       |
| sha1   | sha1_str(s)               | sha1_blob(blob)             | 2 ** 32 - 1       |
| sha2   | sha256_str(s)             | sha256_blob(blob)           | 2 ** 32 - 1       |
|        | sha224_str(s)             | sha224_blob(blob)           | 2 ** 32 - 1       |
|        | sha384_str(s)             | sha384_blob(blob)           | 2 ** 64 - 1       |
|        | sha512_str(s)             | sha512_blob(blob)           | 2 ** 64 - 1       |
|        | sha512_224_str(s)         | sha512_224_blob(blob)       | 2 ** 64 - 1       |
|        | sha512_256_str(s)         | sha512_256_blob(blob)       | 2 ** 64 - 1       |
| sha3   | sha3_224_str(s)           | sha3_224_blob(blob)         | 无限制            |
|        | sha3_256_str(s)           | sha3_256_blob(blob)         | 无限制            |
|        | sha3_384_str(s)           | sha3_384_blob(blob)         | 无限制            |
|        | sha3_512_str(s)           | sha3_512_blob(blob)         | 无限制            |
|        | shake_128_str(s, d)       | shake_128_blob(blob, d)     | 无限制            |
|        | shake_256_str(s, d)       | shake_256_blob(blob, d)     | 无限制            |
| blake2 | blake2b_160_str(s, key)   | blake2b_160_blob(blob, key) | 2 ** 128 - 1       |
|        | blake2b_256_str(s, key)   | blake2b_256_blob(blob, key) | 2 ** 128 - 1       |
|        | blake2b_384_str(s, key)   | blake2b_384_blob(blob, key) | 2 ** 128 - 1       |
|        | blake2b_512_str(s, key)   | blake2b_512_blob(blob, key) | 2 ** 128 - 1       |
|        | blake2s_128_str(s, key)   | blake2s_128_blob(blob, key) | 2 ** 64 - 1        |
|        | blake2s_160_str(s, key)   | blake2s_160_blob(blob, key) | 2 ** 64 - 1        |
|        | blake2s_224_str(s, key)   | blake2s_224_blob(blob, key) | 2 ** 64 - 1        |
|        | blake2s_256_str(s, key)   | blake2s_256_blob(blob, key) | 2 ** 64 - 1        |

- 参数`s`表示需要输入的字符串
- 参数`blob`表示需要输入的blob，可以是使用Blob构造的数据对象，也可以是用户传入的文件等
- 参数`d`表示需要输出的hash值长度（bit），只能用于可变长hash值计算函数 `shake_*`，也可以不设置
- 参数`key`表示blake2中用于修改初始hash值的参数，必须是一个字符串，也可以不设置
  - 对于`blake2b_*`，key的长度必须在0至于64字节之间
  - 对于`blake2s_*`，key的长度必须在0至于32字节之间
  - key字符串中超出限定长度的字符将被忽略
- 函数输出值均为16进制字符（0-9a-z），英文字符均为小写
- 函数名中的最后三位数字一般表示输出的hash值长度（bit）
  - 比如`sha256_str`，256表示输出的hash长度为256bit，即32个字节，64个字符
  - 对于可变长hash值计算函数 `shake_*`而言， `shake_128_*`的默认输出长度为32个字符， `shake_256_*`的默认输出长度为64个字符
  - `md5_*`的输出长度为32个字符
  - `sha1_*`的输出长度为40个字符
- 部分函数名中包含多组数字，如`sha512_256_*`,其本质上是sha512的算法适配了256bit的输出
- 部分函数中对于输入信息的字节长度是有限制的，这一般是由于函数中用到了输入长度，且方法定义中长度信息被定义为32bit或64bit等类型的数值，超出这个限制将产生谬误
  - 注意 2 ** 32 bytes == 4 Gb
  - 不建议直接计算超大文件的hash值，如果一定要做，请考虑使用Blob分批次计算
- 注意所有计算blob的函数都是 **异步** 的


## 参考信息

本项目中的hash值计算方式主要参考 [ietf](https://www.ietf.org/) 以及 [uist](https://www.nist.gov/)。相关文档列举如下：

| 文档                  | 相关加密算法                            |
|:--------------------- |:-------------------------------------- |
| rfc321.pdf            | md5                                    |
| NIST_FIPS_180-4.pdf   | SHA1, SHA2                             |
| NIST_FIPS_202.pdf     | SHA3                                   |
| rfc7693.pdf           | blake2                                 |
| rfc2104.pdf           | HMAC                                   |
| rfc2104.pdf           | PBKDF1, PBKDF2, PBES1, PBES2, PBMAC    |
| rfc7914.pdf           | scrypt                                 |

