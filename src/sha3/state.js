import { new_array, new_matrix, new_cube, f_mod, f_bit_to_hex_x8 } from "../utils.js";

class State {
  constructor(b, nr, d) {
    this.w = b / 25;
    this.l = [1, 2, 4, 8, 16, 32, 64].indexOf(this.w);
    if (this.l < 0) throw new Error("State.l must be an integer between 0 and 6");
    this.nr_default = 12 + 2 * this.l;
    this.nr = nr || this.nr_default;
    this.set_d(d);
    // 存放海绵结构的数据
    this.state = new_cube(5, 5, this.w);
    this.s = new_cube(5, 5, this.w);
    // 存放plane
    this.Theta_C = new_matrix(5, this.w);
    this.Theta_D = new_matrix(5, this.w);
    // 缓存this.rc的计算结果，0 <= i <= 254
    this.rc_cache = [
      1,0,0,0,0,0,0,0,1,0,1,1,0,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1,
      1,0,0,1,0,0,0,0,1,0,1,0,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,0,0,0,
      0,1,1,0,0,0,1,0,1,0,1,1,0,0,1,1,0,0,1,0,1,1,1,1,1,1,0,1,1,1,1,0,
      0,1,1,0,1,1,1,0,1,1,1,0,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,1,0,1,
      1,0,1,0,0,0,1,1,0,0,1,1,1,0,0,1,1,1,1,0,0,0,1,1,0,1,1,0,0,0,0,1,
      0,0,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,0,0,1,1,0,1,
      0,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,0,0,0,0,1,0,0,1,1,1,0,1,1,0,0,
      1,0,0,1,0,0,1,1,0,0,0,0,0,0,1,1,1,0,1,0,0,1,0,0,0,1,1,1,0,0,0
    ]
    this.Iota_RC = new_array(this.w);
    // 总数为5，循环加减1
    this.loop_add =  [1, 2, 3, 4, 0];
    this.loop_minus = [4, 0, 1, 2, 3];
  }
  set_d(d) {
    if (d && typeof(d) == "number" && d > 0) {
      this.len_s = d / 4;
    } else {
      throw new Error("State.d must be a positive integer");
    }
  }
  reset() {
    this.state.map(m => {
      m.map(n => {
        n.fill(0);
      })
    })
  }
  i_to_xyz(i) {
    let z = i % this.w;
    let tmp = (i - z) / this.w;
    let x = tmp % 5;
    let y = (tmp - x) / 5;
    return [x, y, z];
  }
  xyz_to_i(x, y, z) {
    return this.w * (5 * x + y) + z;
  }
  state_to_array() {
    let arr = []
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        for (let z = 0; z < this.w; z++) {
          arr.push(this.state[x][y][z]);
        }
      }
    }
    return arr;
  }
  state_from_array(arr) {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        for (let z = 0; z < this.w; z++) {
          let i = this.xyz_to_i(x, y, z);
          this.state[x][y][z] = arr[i];
        }
      }
    }
  }
  byte_to_array(byte) {
    let arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(byte & 1);
      byte = byte >>> 1;
    }
    return arr;
  }
  Theta() {
    // C[x, z] = A[x, 0, z] ⊕ A[x, 1, z] ⊕ A[x, 2, z] ⊕ A[x, 3, z] ⊕ A[x, 4, z]
    this.Theta_C.map(e=>e.fill(0));
    for (let x = 0; x < 5; x++) {
      for (let z = 0; z < this.w; z++) {
        for (let y = 0; y < 5; y++) {
          this.Theta_C[x][z] = this.Theta_C[x][z] ^ this.state[x][y][z];
        }
      }
    }
    // D[x, z] = C[(x-1) mod 5, z] ⊕ C[(x+1) mod 5, (z-1) mod w]
    let x1, x2, z2;
    for (let x = 0; x < 5; x++) {
      for (let z = 0; z < this.w; z++) {
        x1 = this.loop_minus[x];
        x2 = this.loop_add[x];
        z2 = f_mod(z - 1, this.w);
        this.Theta_D[x][z] = this.Theta_C[x1][z] ^ this.Theta_C[x2][z2];
      }
    }
    // A′[x, y, z] = A[x, y, z] ⊕ D[x, z]
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        for (let z = 0; z < this.w; z++) {
          this.state[x][y][z] = this.state[x][y][z] ^ this.Theta_D[x][z];
        }
      }
    }
  }
  shift_right(arr, n) {
    let i = n % this.w;
    let j = this.w - i;
    let new_arr = arr.splice(j, i);
    arr.splice(0, 0, ...new_arr);
  }
  Rho() {
    let x = 1;
    let y = 0;
    for (let t = 0; t <= 23; t++) {
      // A′[x, y, z] = A[x, y, (z – (t + 1)(t + 2)/2) mod w]
      let n = (t + 1) * (t + 2) / 2;
      this.shift_right(this.state[x][y], n);
      // (x, y) = (y, (2x + 3y) mod 5).
      [x, y] = [y, (2 * x + 3 * y) % 5];
    }
  }
  Pi() {
    // A′[x, y, z]= A[(x + 3y) mod 5, x, z]
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        for (let z = 0; z < this.w; z++) {
          this.s[x][y][z] = this.state[(x + 3 * y) % 5][x][z];
        }
      }
    }
    [this.state, this.s] = [this.s, this.state];
  }
  Chi() {
    // A′ [x, y, z] = A[x, y, z] ⊕ ((A[(x+1) mod 5, y, z] ⊕ 1) ⋅ A[(x+2) mod 5, y, z])
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        for (let z = 0; z < this.w; z++) {
          let x_1 = this.loop_add[x];
          let x_2 = this.loop_add[x_1];
          this.s[x][y][z] = this.state[x][y][z] ^ (
            (this.state[x_1][y][z] ^ 1) &
            this.state[x_2][y][z]
          );
        }
      }
    }
    [this.state, this.s] = [this.s, this.state];
  }
  rc(t) {
    // If t mod 255 = 0, return 1
    let n = f_mod(t, 255);
    if (n === 0) return 1;
    // Let R = 10000000
    let R = 0x80;
    // For i from 1 to t mod 255, let:
    //   a. R = 0 || R;
    //   b. R[0] = R[0] ⊕ R[8];
    //   c. R[4] = R[4] ⊕ R[8];
    //   d. R[5] = R[5] ⊕ R[8];
    //   e. R[6] = R[6] ⊕ R[8];
    //   f. R =Trunc8[R].
    for (let i = 1; i <= n; i++) {
      let r = R & 1;
      R = R >>> 1;
      R = R ^ (r << 7);
      R = R ^ (r << 3);
      R = R ^ (r << 2);
      R = R ^ (r << 1);
    }
    return R >>> 7;
  }
  Iota(ir) {
    // RC[2j – 1] = rc(j + 7ir)
    for (let j = 0; j <= this.l; j++) {
      let i = f_mod(j + 7 * ir, 255)
      this.Iota_RC[2 ** j - 1] = this.rc_cache[i];
    }
    // A′ [0, 0, z] = A′ [0, 0, z] ⊕ RC[z]
    for (let z = 0; z < this.w; z++) {
      this.state[0][0][z] = this.state[0][0][z] ^ this.Iota_RC[z];
    }
  }
  // Rnd(A, ir) = ι(χ(π(ρ(θ(A)))), ir).
  Rnd(ir) {
    this.Theta();
    this.Rho();
    this.Pi();
    this.Chi();
    this.Iota(ir);
  }
  proccess() {
    // For ir from 12 + 2l – nr to 12 + 2l – 1, let A = Rnd(A, ir)
    for (let ir = this.nr_default - this.nr; ir <= this.nr_default - 1; ir++) {
      this.Rnd(ir);
    }
  }
  absorb(data) {
    let arr = [];
    for (let i in data) {
      arr = arr.concat(this.byte_to_array(data[i]));
    }
    for (let i in arr) {
      let [x, y, z] = this.i_to_xyz(i);
      this.state[x][y][z] = this.state[x][y][z] ^ arr[i];
    }
    this.proccess();
  }
  log_array() {
    let s = "";
    let l = 0;
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        for (let z = 0; z < this.w; z += 8) {
          let byte = this.state[x][y].slice(z, z + 8).reverse();
          let num = Number("0b" + byte.join(""));
          s += f_bit_to_hex_x8(num) + " ";
          l += 8;
          if (l >= 128) {
            console.log(s);
            s = "";
            l = 0;
          }
        }
      }
    }
    if (s !== "") {
      console.log(s);
    }
  }
  log_state() {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        let s = "";
        let lane = this.state[x][y].reverse();
        for (let z = 0; z < this.w; z += 8) {
          let byte = lane.slice(z, z + 8);
          let num = Number("0b" + byte.join(""));
          s += f_bit_to_hex_x8(num);
        }
        console.log(x, y, s);
      }
    }
  }
  state_to_hex(s, l) {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        for (let z = 0; z < this.w; z += 8) {
          let byte = this.state[x][y].slice(z, z + 8).reverse();
          let num = Number("0b" + byte.join(""));
          s += f_bit_to_hex_x8(num);
          l += 2;
          if (l >= this.len_s) {
            return s;
          }
        }
      }
    }
    return s;
  }
  squeeze() {
    let s = this.state_to_hex("", 0);
    while(s.length < this.len_s) {
      this.exec();
      s = this.state_to_hex(s, s.length);
    }
    return s;
  }
}

export default State;
