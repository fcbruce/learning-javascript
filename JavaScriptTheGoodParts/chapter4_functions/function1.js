'use strict';
/*
 * Chapter 4 Functions
 *
 */


/*
 * The Method Invocation Pattern
 *
 * When a function is stored as a property of an object, 
 * we call it a method.
 *
 */

var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment(); // 1
console.log(myObject.value);

myObject.increment(2);
console.log(myObject.value); // 3


/*
 * The Function Invocation Pattern
 *
 * When a function is not the property of an object, 
 * then it is invoked as a function.
 *
 */

var add = function (a, b) {
  return a + b;
};

var sum = add(3, 4); // sum is 7

/*
 * When a function is invoked with this pattern, 
 * this is bound to the global object.
 * This was a mistake in the design of the language.
 * Had the language been designed correctly, 
 * when the inner function is invoked, this would still be 
 * bound to the this variable of the outer function.
 * A consequence of this error is that a method cannot 
 * employ an inner function to help it do its work because 
 * the inner function does not share the method's access 
 * to the object as its this is bound to the wrong value. 
 * Fortunately, there is an easy workaround. 
 * If the method defines a variable and assigns it the 
 * value of this, the inner function will have access to 
 * this through that variable.
 * By convention, the name of that variable is that:
 *
 */

// Augment myObject with a double method.
myObject.double = function () {
  var that = this; // Workaround.

  var helper = function () {
    that.value = add(that.value, that.value);
  };

  helper(); // Invoke helper as a function.
};

// Invoke double as a method.
myObject.double();
console.log(myObject.value); // 6



/*
 * The Constructor Invocation Pattern
 *
 * If a function is invoked with the new prefix, then a new object 
 * will be created with a hidden link to the value of the function's 
 * prototype member, and this will be bound to that new object. 
 *
 * The new prefix also changes the behavior of the return statement. 
 *
 */

var Quo = function (string) {
  this.status = string;
};

Quo.prototype.get_status = function () {
  return this.status;
};

var myQuo = new Quo('confused');
console.log(myQuo.get_status()); // confused


/*
 * The Apply Invocation Pattern
 *
 * Because JavaScript is a functional object-ortented language, 
 * functions can have methods. 
 *
 * The apply method lets us construct an array of arguments to 
 * use to invoke a function. It also lets us choose the value of this. 
 * The apply method takes two parameters. 
 * The first is the value that should be bound to this. 
 * The second is an array of parameters. 
 * 
 */

var array = [3, 4];
var sum = add.apply(null, array); // sum is 7

var statusObject = {
  status: 'A-OK'
};

console.log(Quo.prototype.get_status.apply(statusObject)); // A-OK
console.log(myQuo.get_status.apply(statusObject)); // A-OK


/*
 * Arguments
 *
 * A bonus parameter that is avilable to function when they 
 * are invoked is the arguments array.
 *
 */

var calc_sum = function () {
  var sum = 0;
  for (let i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }
  return sum;
}

console.log(calc_sum(1, 2, 3, 4, 5)); // 15


/*
 * Return
 *
 * If the function was invoked with the new prefix and the return 
 * value is not an object, the this (the new object) is returned instead.
 * 
 */

var foo1 = function () {
  return 0;
};

var bar1 = new foo1();
console.log(bar1); // {}

var foo2 = function () {
  return {
    att1: 'att1'
  };
};

var bar2 = new foo2();
console.log(bar2); // { att1: 'att1'}

var foo3 = function () {
  return 'foo3';
};

var bar3 = new foo3();
console.log(bar3); // {}
