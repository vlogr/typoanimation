/**
 * Given a direction and a position, return the x and y coordinates of the position
 * @param direction - The direction to move the element.
 * @param position - The position of the element.
 * @returns an object with two properties: x and y.
 */
function switchPositions (direction, position) {
    let x = 0, y = 0

    switch (direction) {
      case 'left':
        x = -position;
        break;

      case 'right':
        x = position;
        break;

      case 'top':
         y = -position;
        break;

      case 'bottom':
        y = position;
        break;

      case 'leftTop':
        x = -position
        y = -position;
        break;

      case 'rightTop':
        x = position;
        y = -position;
        break;

      case 'leftBottom':
        x = -position;
        y = position;
        break;

      case 'rightBottom':
        x = position;
        y = position;
        break;
    }

    return {x, y}
  }


  export default switchPositions
