export default options => {
  if (!options) {
    throw "options is undefined";
  }

  const { url, timeout = 0 } = options;
  if (!url && typeof url !== "string") {
    throw "url is wrong";
  }

  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    // 超时
    xhr.timeout = timeout;
    xhr.open("GET", url);
    xhr.send();

    xhr.timeout = () => {
      alert("超时");
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr.responseText);
      } else {
        // alert("未返回");
      }
    };
  });
};
