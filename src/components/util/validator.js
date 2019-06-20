function isPhone(value) {
  return value.length === 11;
}

export default (type, value) => {
  switch (type) {
    case "phone":
      return isPhone(value);
    case "required":
      return Boolean(value);
    default:
      return Boolean(value);
  }
};
