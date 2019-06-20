const path = require("path");

exports.resolve = filePath => {
  return path.resolve(__dirname, filePath);
};
