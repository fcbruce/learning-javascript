'use strict';

/**
 * number.toExponential(fractionDigits)
 */
!function () {
  var pi = Math.PI;

// 3.141592653589793
  console.log(pi);

// 3e+0
  console.log(pi.toExponential(0));

// 3.14e+0
  console.log(pi.toExponential(2));

// 3.1415927e+0
  console.log(pi.toExponential(7));

// 3.1415926535897931e+0
  console.log(pi.toExponential(16));

// 3.141592653589793e+0
  console.log(pi.toExponential());
}();


/**
 * number.toFixed(fractionDigits)
 */
!function () {
  var pi = Math.PI;

// 3
  console.log(pi.toFixed(0))

// 3.14
  console.log(pi.toFixed(2))

// 3.1415927
  console.log(pi.toFixed(7))

// 3.1415926535897931
  console.log(pi.toFixed(16))

// 3
  console.log(pi.toFixed())
}();


/**
 * number.toPrecision(precision)
 */
!function () {
  var pi = Math.PI;

// 3.141592653589793
  console.log(pi.toPrecision());

// 3.1
  console.log(pi.toPrecision(2));
}();

/**
 * number.toString(radix)
 */
!function () {
  var pi = Math.PI;

// 11.001001000011111101101010100010001000010110100011
  console.log(pi.toString(2));

// 3.243f6a8885a3
  console.log(pi.toString(16));

// 3.141592653589793
  console.log(pi.toString());
}();
