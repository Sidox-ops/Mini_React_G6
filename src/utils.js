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
