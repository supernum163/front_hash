import { f_utf8_enc, new_array } from "./utils.js";


// 核心实现类
class Hash_x32 {
  constructor(batch_size = 64, m_size = 64) {
    // 每次需要处理的数据量
    this.batch_size = batch_size;
    // 最后一个批次的数据，数据量不能大于等于这个值
    this.max_last_batch_length = this.batch_size - batch_size / 8;
    // 每次需要处理的数据
    this.M = new_array(m_size);
    // 缓存数据
    this.data = [];
  }
  // 重置关键数据（清空缓存数据，初始化hash值等）
  reset() {
    // 清空缓存数据
    this.data.length = 0;
    // 重置数据总长度
    this.reset_length();
    // 重置当前计算状态
    this.status = 0;  // 0: "循环更新", 1: "更新最后一组数据", 2: "计算完毕"
  }
  reset_length() {
    this.length = 0;
  }
  add_length(length) {
    this.length += length;
  }
  get_length() {
    return [this.length >>> 29, this.length << 3];
  }
  // 循环更新四个标准幻数，数据不足512bit时放入缓存变量中
  update(data) {
    if (typeof(data) === "string") {
      data = data.replace(/\r\n/g, "\n");
      data = f_utf8_enc(data);
    }
    this.add_length(data.length);
    this.data = this.data.concat(data);
    for (let n = this.data.length; n > this.batch_size; n -= this.batch_size) {
      this.exec(this.data.splice(0, this.batch_size));
    }
  }
  // 单次更新四个标准幻数
  exec(data) {
    // this.hash_value = this.hash_value ^ data;
  }
  // 在数据尾部填充特定信息
  padding() {
    // 最后一批数据大小可能恰好等于batch_size
    if (this.data.length >= this.batch_size) {
      this.exec(this.data.splice(0, this.batch_size));
    }
    let n = this.data.length;
    this.data[n] = 0x80;
    let pad = new_array(this.batch_size - n - 1);
    this.data = this.data.concat(pad);
    if (n >= this.max_last_batch_length) {
      this.exec(this.data);
      this.data = new_array(this.batch_size);
    }
  }
  // 用最后一组数据更新四个标准幻数，并返回hash值
  hex() {
    this.padding();
    this.status = 1;
    this.exec(this.data);
    let r = this.to_hex();
    this.reset();
    return r;
  }
  // 将最终结果转化为hash值
  to_hex() {
    // return this.hash_value;
  }
}

export default Hash_x32;
