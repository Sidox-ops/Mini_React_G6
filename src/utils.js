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

Object.prototype.prop_access = function (path) {
  if (path === "" || path === null) {
    return this;
  }

  const properties = path.split(".");
  let newPath = "";
  return properties.reduce((prev, curr) => {
    newPath += "." + curr;

    if (prev === null) {
      console.log("test not exist.");
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(prev, curr)) {
      newPath = newPath.substring(1);
      console.log(newPath + " not exist.");
    }

    return prev[curr];
  }, this);
};
