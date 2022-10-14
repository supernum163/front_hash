import { 
  f_utf8_enc, 
} from "../utils.js";


const pdkdf1 = (Hash, P, S, c, dk_len) => {
  let r = Hash(P + S);
  for (let i = 1; i < c; i++) {
    r = Hash(r);
  }
  if (dk_len > r.length) {
    console.warn("Parameter dk_len too large")
  } else {
    return r.substr(0, dk_len);
  }
}


const pdkdf2_INT = (num) => {
  let r = [];
  for (let i = 24; i >= 0; i-=8) {
    r.push((num >>> i) & 0xFF);
  }
  return r;
}

const pdkdf2_F = (PRF, P, S, c, i) => {
  let I = pdkdf2_INT(i);
  let u = PRF(P, S.concat(I));
  let r = u;
  for (let k = 1; k < c; k++) {
    u = PRF(P, u);
    r = r.map((e, j) => e ^ u[j]);
  }
  return r;
}

const pdkdf2 = (PRF, P, S, c, dk_len, h_len) => {
  let l = Math.ceil(dk_len / h_len);
  if (l > 0xFFFFFFFF) {
    console.warn("Parameter dk_len too large");
    l = 0xFFFFFFFF;
  }
  if (typeof(P) == "string") {
    P = f_utf8_enc(P);
  }
  if (typeof(S) == "string") {
    S = f_utf8_enc(S);
  }
  let r = [];
  for (let i = 1; i <= l; i++) {
    let t = pdkdf2_F(PRF, P, S, c, i);
    r = r.concat(t);
  }
  r.length = dk_len;
  return r;
}


export { pdkdf1, pdkdf2 }
