export function getFunctionBody(myFunction) {
  const entire = myFunction.toString();
  const body = entire.substring(
    entire.indexOf("{") + 1,
    entire.lastIndexOf("}")
  );
  return body;
}

export function isClass(e) {
  return typeof e === "function" && /^\s*class\s+/.test(e.toString());
}

// Check that the type of argument 1 matches the value of argument 2.
function type_check_v1(variable, type) {
  if (variable === null && type === "null") return true;
  if (
    typeof variable === type &&
    !(variable === null && type === "object") &&
    !(type === "object" && variable.__proto__.constructor == Array)
  ) {
    return true;
  } else if (type === "array" && variable.__proto__.constructor == Array) {
    return true;
  } else {
    return false;
  }
}

/* Check that argument 1 matches the value of typing object (argument 2)
 * type_check_v2(1, {type: 'number'}); return true
 * type_check_v2(1, {enum: ["hello", 3]}); return false */
function type_check_v2(variable, type) {
  for (let key in type) {
    switch (key) {
      case "type":
        if (!type_check_v1(variable, type[key])) return false;
        break;
      case "value":
        if (JSON.stringify(variable) !== JSON.stringify(type[key])) {
          return false;
        }
        break;
      case "enum":
        let valid = false;
        for (let val of type[key]) {
          valid = type_check_v2(variable, { value: val });
          if (valid) break;
        }
        if (!valid) return false;
    }
  }
  return true;
}

/* Recursively checks if a property of a given type belongs to an object */
export function type_check(variable, conf) {
  for (let key of Object.keys(conf)) {
    switch (key) {
      case "type":
      case "value":
      case "enum":
        let newConf = {};
        newConf[key] = conf[key];
        if (!type_check_v2(variable, newConf)) return false;
        break;
      case "properties":
        for (let prop of Object.keys(conf[key])) {
          if (variable[prop] === undefined) return false;
          if (!type_check(variable[prop], conf[key][prop])) return false;
        }
        break;
    }
  }
  return true;
}

/* Iterates over an object using a path.
 * If this path exists, it returns it or returns its value
 * If it does not exist an error is thrown */
export function prop_access(obj, path) {
  if (typeof path != "string") return obj;
  if (path === "") return obj;
  if (typeof obj != "object" || obj === null) {
    throw new Error(path + "in" + obj + "doesnt exist");
  }
  const props = path.split(".");
  let propriete = obj;
  props.forEach((prop) => {
    if (!Object.prototype.hasOwnProperty.call(propriete, prop)) {
      throw new Error(path + "in" + obj + "doesnt exist");
    }
    propriete = propriete[prop];
  });
  return propriete;
}
