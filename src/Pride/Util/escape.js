const escape = function (string) {
  const temp_element = document.createElement('div');
  temp_element.appendChild(document.createTextNode(string));

  return temp_element.innerHTML;
};

export default escape;
