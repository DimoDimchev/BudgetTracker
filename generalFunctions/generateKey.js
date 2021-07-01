// function to generate a key for each category
const generateKey = (category) => {
  let key = "";
  for (let i = 0; i < category.length; i++) {
    key += category.charCodeAt(i);
  }
  return key;
};

export default generateKey;
