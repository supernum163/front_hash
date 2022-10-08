import FRONT_HASH from "../index.js";
import "./index.css";

const toast = document.getElementById("toast");
let timeout_id = 0;
const f_toast = (content, x, y) => {
  clearTimeout(timeout_id);
  toast.innerText = content;
  toast.style.left = `${x}px`;
  toast.style.top = `${y}px`;
  toast.style.display = "block";
  timeout_id = setTimeout(() => {
    toast.style.display = "none";
  }, 500);
}

const hash_str = document.getElementById("hash_str");
const hs_input = hash_str.getElementsByTagName("input")[0];
const hs_ftype = hash_str.getElementsByTagName("select")[0];
const hs_exec = hash_str.getElementsByTagName("button")[0];
const hs_output = hash_str.getElementsByTagName("pre")[0];
const hs_copy = hash_str.getElementsByTagName("button")[1];
hs_exec.addEventListener("click", (event) => {
  let f = FRONT_HASH[hs_ftype.value];
  if (!f) {
    hs_output.classList.add("error");
    hs_output.innerText = `Error: 未找到相应函数"${hs_ftype.value}"`;
  } else {
    hs_output.classList.remove("error");
    hs_output.innerText = f(hs_input.value);
  }
});
hs_copy.addEventListener("click", (event) => {
  let error = hs_output.classList.contains("error");
  let content = hs_output.innerText;
  if (!error && content) {
    navigator.clipboard.writeText(content);
    f_toast("复制成功", event.pageX, event.pageY);
  } else {
    f_toast("<空>", event.pageX, event.pageY);
  }
})

const hash_blob = document.getElementById("hash_blob");
const hb_input = hash_blob.getElementsByTagName("input")[0];
const hb_ftype = hash_blob.getElementsByTagName("select")[0];
const hb_exec = hash_blob.getElementsByTagName("button")[0];
const hb_output = hash_blob.getElementsByTagName("pre")[0];
const hb_copy = hash_blob.getElementsByTagName("button")[1];
hb_exec.addEventListener("click", async (event) => {
  let f = FRONT_HASH[hb_ftype.value];
  let file = hb_input.files[0];
  if (!f) {
    hb_output.classList.add("error");
    hb_output.innerText = `Error: 未找到相应函数"${hb_ftype.value}"`;
  } else if (!file) {
    hb_output.classList.add("error");
    hb_output.innerText = `Error: 请选择一个文件`;
  } else if (file.size >= 1073741824) {
    hb_output.classList.add("error");
    hb_output.innerText = `Error: 文件太大`;
  } else {
    hb_output.classList.remove("error");
    hb_output.innerText = await f(file);
  }
});
hb_copy.addEventListener("click", (event) => {
  let error = hb_output.classList.contains("error");
  let content = hb_output.innerText;
  if (!error && content) {
    navigator.clipboard.writeText(content);
    f_toast("复制成功", event.pageX, event.pageY);
  } else {
    f_toast("<空>", event.pageX, event.pageY);
  }
})

