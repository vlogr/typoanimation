/**
 * It returns the position of an element relative to the top left corner of the window.
 * @param element - The element to get the position of.
 * @returns A JavaScript object with two properties: left and top.
 */
function getPosition(element) {
  let clientRect = element.getBoundingClientRect();
  var html = document.documentElement;

  return {left: clientRect.left + window.pageXOffset - html.clientLeft,
          top: clientRect.top + window.pageYOffset - html.clientTop};
}


export default getPosition;
