export default function escape(string) {
  const tempElement = document.createElement('div');
  tempElement.appendChild(document.createTextNode(string));

  return tempElement.innerHTML;
}
