
/**
 * @param {*} n1 Number|String
 * @param {*} n2 Number|String
 * @param {*} type Number|String
 * math(0.1, 0.2, '+') = 0.3;
 */
function maths(n1, n2, type) {
  let result, y, a, b, len1, len2, max;
  if (n2 == 0 && type == 4) { return 0 }
  a = String(n1);
  b = String(n2);
  len1 = a.split(".")[1] ? a.split(".")[1].length : 0;
  len2 = b.split(".")[1] ? b.split(".")[1].length : 0;
  max = len1 > len2 ? len1 : len2;
  a = Math.round(a * Math.pow(10, max));
  b = Math.round(b * Math.pow(10, max));
  switch (type) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = a / b;
      break;
  }
  if (type == 1 || type == 2) {
    y = max;
  } else if (type == 3) {
    y = max * 2;
  } else {
    y = 0;
  }
  return result / Math.pow(10, y);
}

export default class Maths {
  static add(a, b) {
    return maths(a, b, '+')
  }
  static sub(a, b) {
    return maths(a, b, '-')
  }
  static mul(a, b) {
    return maths(a, b, '*')
  }
  static divi(a, b) {
    return maths(a, b, '/')
  }
}