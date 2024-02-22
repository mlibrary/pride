const escape = (string) => {
  const tempElement = document.createElement('div');
  tempElement.appendChild(document.createTextNode(string));
  return tempElement.innerHTML;
};

export default escape;
