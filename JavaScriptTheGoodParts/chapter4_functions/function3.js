'use strict';

/*
 * Module
 *
 * We can use functions and  closure to make modules.
 * A module is a function or object that presents an interface 
 * but that hides its state and implementation.
 *
 */
!function () {
  Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
      this.prototype[name] = func;
    }
    return this;
  };

  String.method('deentityify', function () {
    var entity = {
      quot: '"',
      lt: '<',
      gt: '>'
    };

    // Return the deentityify method.
    return function () {
      return this.replace(/&([^&;]+);/g,
        function (a, b) {
          var r = entity[b];
          return typeof r === 'string' ? r : a;
        }
      );
    };
  }());
  console.log('&lt;&quot;&gt;'.deentityify()); // <">


  /*
   * It can also be used to produce objects that are secure.
   * Let's suppose we want to make an object that produces a serial number. 
   *
   */
  var serial_maker = function () {
    var prefix = '';
    var seq = 0;
    return {
      set_prefix: function (p) {
        prefix = String(p);
      },
      set_seq: function (s) {
        seq = s;
      },
      gensym: function () {
        var result = prefix + seq;
        seq += 1;
        return result;
      }
    };
  };

  var seqer = serial_maker();
  seqer.set_prefix('Q');
  seqer.set_seq(1000);
  console.log(seqer.gensym()); // Q1000
  console.log(seqer.gensym()); // Q1001

  var seqer2 = serial_maker();
  console.log(seqer2.gensym()); // 0
  console.log(seqer.gensym()); // Q1002
}();


/*
 * Cascade
 *
 * Some methods do not have a return value.
 * For example, it is typical for methods that set or change the state 
 * of an object to return nothing. 
 * If we have those methods return this instead of undefined, 
 * we can enable cascades. 
 * In a cascades, we can call many methods on the same object in sequence 
 * in a single statement. 
 *
 */


/*
 * Curry
 *
 * Functions are values, and we can manipulate function values in interesting ways.
 * Currying allows ue to produce a new function by combining a function and an argument.
 *
 */
!function () {
  /*
   * The curry method works by creating a closure that holds that original 
   * function and the argument to curry. 
   * It returns a function that, when invoked, returns the result of calling 
   * that original function, passing it all of the arguments from the invocation
   * of curry and the current invocation.
   * It uses the Array concat method to concatenate the two arrays of arguments together. 
   *
   */
  Function.method('curry', function () {
    var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      that = this; // this is the Function
    return function () {
      var arg = args.concat(slice.apply(arguments));
      console.log(arg);
      return that.apply(null, arg);
    };
  });

  var add = function (x,  y) {
    return x + y;
  };

  var add1 = add.curry(1);
  var add2 = add1.curry(2);
  var add3 = add2.curry(300);
  console.log(add3(400));
  /*
   * [ 300, 400 ]
   * [ 2, 300, 400 ]
   * [ 1, 2, 300, 400 ]
   * 3
   *
   */
  console.log(add.curry(1).curry(2).curry(300)(400));
  /*
   * [ 300, 400 ]
   * [ 2, 300, 400 ]
   * [ 1, 2, 300, 400 ]
   * 3
   *
   */
}();


/*
 * Memoization
 *
 */
!function () {
  var memoizer = function (memo, formula) {
    var recur = function (n) {
      var result = memo[n];
      if (typeof result !== 'number') {
        result = formula(recur, n);
        memo[n] = result;
      }
      return result;
    }
    return recur;
  };
  var memo = [0, 1];
  var fibonacci = memoizer(memo, function (recur, n) {
    return recur(n - 1) + recur(n - 2);
  });
  console.log(fibonacci(6)); // 8
  console.log(memo[5]); // 5
}();
