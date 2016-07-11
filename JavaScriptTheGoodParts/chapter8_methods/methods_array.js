'use strict';

/**
 * array.concat(item...)
 *
 * The concat method produces a new array containing a shallow copy of 
 * this array with the items appended to it.
 * If an item is an array, then each of its elements is appended individually.
 */
!function () {
  var a = ['a', 'b', 'c'];
  var b = ['x', 'y', 'z'];
  var c = a.concat(b, true);

// c is [ 'a', 'b', 'c', 'x', 'y', 'z', true ]
  console.log(c);

  a.push('d');

// a is [ 'a', 'b', 'c', 'd' ]
  console.log(a);

// c is [ 'a', 'b', 'c', 'x', 'y', 'z', true ]
  console.log(c);

  var x = [{v: 0}];
  var y = x.concat(x);

// y is [ { v: 0 }, { v: 0 } ]
  console.log(y);

  x[0].v += 1;

// y is [ { v: 1 }, { v: 1 } ]
  console.log(y);
}();


/**
 * array.join(separator)
 * The join method makes a string from an array. 
 * It does this by making a string of each of the array's elements, 
 * and then concatenating them all together with a separator between them. 
 * The default separator is ','. 
 * To join without separation, use an empty string as the separator. 
 */
!function () {
  var a = ['a', 'b', 'c'];
  a.push('d');
  var c = a.join('');

// c is 'abcd'
  console.log(c);
}();


/**
 * array.pop() & array.push(item...)
 */
!function () {
  var a = ['a', 'b', 'c'];
  var c = a.pop();

// a is [ 'a', 'b' ]
  console.log(a);

// c is 'c'
  console.log(c);

  var b = ['x', 'y'];
  var d = a.push(b, 1);

// a is [ 'a', 'b', [ 'x', 'y' ], 1 ]
  console.log(a);

// c is 4, the length of array a
  console.log(d);
}();


/**
 * array.reverse()
 */
!function () {
  var a = ['a', 'b', 'c'];
  var b = a.reverse();

// both a and b are [ 'c', 'b', 'a' ]
  console.log(a);
  console.log(b);
}();


/**
 * array.shift()
 * 
 * The shift method removes the first element from an array and return it.
 */
!function () {
  var a = ['a', 'b', 'c'];
  var c = a.shift();

// a is [ 'b', 'c' ]
  console.log(a);
// c is 'a'
  console.log(c);
}();


/**
 * array.slice(start, end)
 *
 * The slice method makes a shallow copy of a portion of an array.
 */
!function () {
  var a = ['a', 'b', 'c'];
  
// [ 'a' ]
  console.log(a.slice(0, 1));

// [ 'b', 'c' ]
  console.log(a.slice(1));

// [ 'b' ]
  console.log(a.slice(1, 2));

// [ 'b', 'c' ]
  console.log(a.slice(1, 10));

  var b = [{v: 0}, {v: 1}, {v: 2}];
  var c = b.slice(0, 2);

// c is [ { v: 0 }, { v: 1 } ]
  console.log(c);

  b[0].v += 100;

// b is [ { v: 100 }, { v: 1 }, { v: 2 } ]
  console.log(b);

// c is [ { v: 100 }, { v: 1 } ]
  console.log(c);
}();
