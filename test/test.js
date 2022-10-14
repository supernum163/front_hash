
const f_reveal_arg = (arg) => {
  if (arg instanceof Array) {
    return "[" + arg.map(f_reveal_arg).join(", ") + "]";
  } else if (arg instanceof Function) {
    return '`' + arg.name + '`';
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
  } else if (x instanceof Array) {
    if (x.length != y.length) return false;
    for (var z = 0; z < x.length; z++) {
      if (!f_identity(x[z], y[z])) {
        return false;
      }
    }
    return true;
  } else if (x instanceof Object) {
    if (Object.getOwnPropertyNames(x).length != 
        Object.getOwnPropertyNames(y).length) return false;
    for (var z in x) {
      if (!f_identity(x[z], y[z])) {
        return false;
      }
    }
    return true;
  } else {
    return x == y;
  }
}

class Test {
  constructor(fp){
    this.fp = fp;
    this.n = 0;
  }
  identity(x, y) {
    return f_identity(x, y)
  }
  async assert(expect, func, args, env) {
    let counter = ++this.n;
    if (!(args instanceof Array)) {
      args = [args];
    }
    try {
      let val = await func.apply(env, args);
      if (!f_identity(val, expect)) {
        let real_args = args.map(f_reveal_arg);
        let real_val = f_reveal_arg(val);
        let real_expect = f_reveal_arg(expect);
        let formula = `${func.name}(${real_args.join(", ")})`;
        console.error(`Error [${counter}] ${this.fp} >> ${formula}: ${real_val} !== ${real_expect}`);
      }
    } catch (error) {
      console.log(error);
      console.error(`Fatal [${counter}] ${this.fp} >> ${func.name}, ${args}`);
      return;
    }
  }
}

export default Test;
