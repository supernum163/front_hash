
const f_reveal_arg = (arg) => {
  if (arg instanceof Array) {
    return "[" + arg.map(f_reveal_arg).join(", ") + "]";
  } else if (arg instanceof Object) {;
    let r = [];
    for (let k in arg) {
      r.push(k + ": " + f_reveal_arg(arg[k]));
    }
    "{" + r.join(", ") + "}";
  } else if (typeof(arg) == "string") {
    return '"' + arg + '"';
  } else {
    return arg;
  }
}

const f_identity = (x, y) => {
  if (typeof(x) != typeof(y)) {
    return false;
  } else if (x instanceof Array || x instanceof Object) {
    for (var z in x) {
      if (!f_identity(x[z], y[z])) {
        return false;
      }
    }
    return true;
  } else {
    if (x != y) {
      return false;
    } else {
      return true;
    }
  }
}

class Test {
  constructor(fp){
    this.fp = fp;
    this.n = 0;
  }
  async assert(expect, func, args, env) {
    this.n += 1;
    if (!(args instanceof Array)) {
      args = [args];
    }
    try {
      let val = await func.apply(env, args);
      if (!f_identity(val, expect)) {
        let real_args = args.map(f_reveal_arg);
        let formula = `${func.name}(${real_args.join(", ")})`;
        console.error(`Error [${this.n}] ${this.fp} >> ${formula}: ${val} !== ${expect}`);
      }
    } catch (error) {
      console.error(`Fatal [${this.n}] ${this.fp} >> ${func.name}, ${args}: ${error}`);
      return;
    }
  }
}

export default Test;

