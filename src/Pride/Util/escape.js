const escape = function(string) {
  var temp_element = document.createElement('div');
  temp_element.appendChild(document.createTextNode(string));

  return temp_element.innerHTML;
};

export default escape;
