const htmlEscapes = {
  "&": "&amp",
  "<": "&lt",
  ">": "&gt",
  '"': "&quot",
  "'": "&#39"
};

const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

export function escape(string) {
  return string && reHasUnescapedHtml.test(string)
    ? string.replace(reUnescapedHtml, chr => htmlEscapes[chr])
    : string;
}

export function trim(string) {
  if (!string) return "";
  if (!String.prototype.trim) {
    return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  } else {
    return string.trim();
  }
}

export function findIndex(arr, callback) {
  if (typeof callback !== "function") {
    throw new Error("callback must be a function");
  }
  for (let i = 0; i < arr.length; i += 1) {
    if (callback(arr[i])) {
      return i;
    }
  }
  return -1;
}

export function find(arr, callback) {
  if (typeof callback !== "function") {
    throw new Error("callback must be a function");
  }
  for (let i = 0; i < arr.length; i += 1) {
    if (callback(arr[i])) {
      return arr[i];
    }
  }
  return -1;
}

export function removeHTML(str) {
  if (str) {
    return str.replace(/<[^>]+>/g, "");
  }
  return str;
}
