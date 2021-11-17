// extract any functions you are using to manipulate your data, into this file

exports.getValuesFromObject = (data) => {
  return data.map((object) => {
    return Object.values(object);
  });
};
