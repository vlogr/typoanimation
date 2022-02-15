/**
 * Given an array of elements, this function will return a function that will calculate the position of
 * each element in the array relative to the others
 * @param vars - An object containing the following properties:
 * @returns A function that takes a value and returns a value.
 */
function distributeByPosition(vars) {
    let ease = vars.ease,
      from = vars.from || 0,
      base = vars.base || 0,
      axis = vars.axis,
      ratio = {center:0.5, end:1}[from] || 0,
      distances;
    return function(i, target, a) {
      let l = a.length,
        originX, originY, x, y, d, j, minX, maxX, minY, maxY, positions;
      if (!distances) {
        distances = [];
        minX = minY = Infinity;
        maxX = maxY = -minX;
        positions = [];
        for (j = 0; j < l; j++) {
          d = a[j].getBoundingClientRect();
          x = (d.left + d.right) / 2; //based on the center of each element
          y = (d.top + d.bottom) / 2;
          if (x < minX) {
            minX = x;
          }
          if (x > maxX) {
            maxX = x;
          }
          if (y < minY) {
            minY = y;
          }
          if (y > maxY) {
            maxY = y;
          }
          positions[j] = {x:x, y:y};
        }
        originX = isNaN(from) ? minX + (maxX - minX) * ratio : positions[from].x || 0;
        originY = isNaN(from) ? minY + (maxY - minY) * ratio : positions[from].y || 0;
        maxX = 0;
        minX = Infinity;
        for (j = 0; j < l; j++) {
          x = positions[j].x - originX;
          y = originY - positions[j].y;
          distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs((axis === "y") ? y : x);
          if (d > maxX) {
            maxX = d;
          }
          if (d < minX) {
            minX = d;
          }
        }
        distances.max = maxX - minX;
        distances.min = minX;
        distances.v = l = vars.amount || (vars.each * l) || 0;
        distances.b = (l < 0) ? base - l : base;
      }
      l = (distances[i] - distances.min) / distances.max;
      return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
    };
  }

export default distributeByPosition;
