'use strict';

/*
 * Exceptions
 *
 */
!function () {
  var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw {
        name: 'TypeError',
        message: 'add needs numbers'
      };
    }
    return a + b;
  }

  var try_it = function () {
    try {
      add('seven');
    } catch (e) {
      console.log(e.name + ' ' + e.message); // TypeError add needs numbers
    }
  }

  try_it();
}();


/*
 * Augmenting Types
 *
 * JavaScript allows the basic types of the language to be augmented.
 *
 */
!function () {
  Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
      this.prototype[name] = func;
    }
    return this;
  };

  Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
  });

  console.log((-10 / 3).integer()); // -3

  String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
  });

  console.log('"' + '    neat   '.trim() + '"'); // "neat"

}();


/*
 * Recurison
 *
 */
!function () {
  var hanoi = function (n, source, temp, target) {
    if (n == 0) return ;
    hanoi(n - 1, source, target, temp);
    console.log('Move from ' + source + ' to ' + target);
    hanoi(n - 1, temp, source, target);
  };

  hanoi(3, 'A', 'B', 'C');
}();
/*
Move from A to C
Move from A to B
Move from C to B
Move from A to C
Move from B to A
Move from B to C
Move from A to C
 */


/*
 * Scope
 *
 * JavaScript does have function scope.
 * JavaScript does not have block scope.
 *
 */
!function () {
  var foo = function () {
    var a = 3, b = 5;

    var bar = function () {
      var b = 7, c = 11;

      // a is 3, b is 7, c is 11

      a += b + c;

      // a is 21, b is 7, c is 11
    };

    // a is 3, b is 5, c is not defined
    
    bar();

    // a is 21, b is 5
  };
}();


/*
 * Closure
 *
 */
!function () {

  /*
   * Instead of initializing myObject with an object literal,
   * we will initialize myObject by calling a function that 
   * returns an object literal. 
   * That function defines a value variable.
   * That variable is always avilable to the increment and getValue methods, 
   * but the function's scope keeps it hidden from the rest of the program. 
   */
  var myObject = (function () {
    var value = 0;

    return {
      increment: function (inc) {
        value += typeof inc === 'number' ? inc : 1;
      },
      getValue: function () {
        return value;
      }
    };
  }());

  /*
   * The Quo constructor from earlier in this chapter produced an object 
   * with a status property and a get_status method. 
   * But that doesn't seem very interesting. 
   * Why would you call a getter method on a property you could access directly? 
   * It would be more useful if the status property were private.
   * 
   */
  var quo = function (status) {
    return {
      get_status: function () {
        return status;
      }
    };
  };

  var myQuo = quo("amazed");

  console.log(myQuo.get_status()); // amazed


  /*
   * It is important to understand that the inner function has access to 
   * the actual variables of the outer functions and not copies in order to 
   * avoid the following problem.
   *
   */
  // BAD EXAMPLE
  // Make a function that assigns event hander functions to an array of nodes the wrong way.
  // When you click on a node, an alert box is supposed to display the ordinal of the node.
  // But it always displays the number of nodes instead.
  var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
      nodes[i].onclick = function (e) {
        console.log(i); // change alert(i) to console.log(i) for running by console
      };
    }
  };
  var nodes = [{}, {}, {}];
  add_the_handlers(nodes);
  nodes[0].onclick(); // 3
  nodes[1].onclick(); // 3
  nodes[2].onclick(); // 3
  /*
   * The add_the_handlers function was intended to give each handler 
   * a unique number i.
   * It fails because the handler functions are bound to the variable i,
   * not the value of the variable i at the time the function was made.
   *
   */
  // BETTER EXAMPLE
  // Make a function that assigns event handler functions to an array of nodes.
  // When you click on a node, an alert box will display the ordinal of the node.
  var add_the_handlers = function (nodes) {
    var helper = function (i) {
      return function (e) {
        console.log(i);
      };
    };
    var i;
    for (i = 0; i < nodes.length; i += 1) {
      nodes[i].onclick = helper(i);
    }
  };
  var nodes = [{}, {}, {}];
  add_the_handlers(nodes);
  nodes[0].onclick(); // 0
  nodes[1].onclick(); // 1
  nodes[2].onclick(); // 2
  // MY EXAMPLE
  // Author: fcbruce
  // What about transfer an object?
  var add_the_handlers = function (nodes) {
    var helper = function (i) {
      return function (e) {
        console.log(i.value);
      };
    };
    var i;
    for (i = {value: 0, inc: function () {this.value += 1;}}; 
        i.value < nodes.length; i.inc()) {
      nodes[i.value].onclick = helper(i);
    }
  };
  var nodes = [{}, {}, {}];
  add_the_handlers(nodes);
  nodes[0].onclick(); // 3
  nodes[1].onclick(); // 3
  nodes[2].onclick(); // 3
  // What about use let instead of var in BAD EXAMPLE?
  var add_the_handlers = function (nodes) {
    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].onclick = function (e) {
        console.log(i); // change alert(i) to console.log(i) for running by console
      };
    }
  };
  var nodes = [{}, {}, {}];
  add_the_handlers(nodes);
  nodes[0].onclick(); // 0
  nodes[1].onclick(); // 1
  nodes[2].onclick(); // 2
}();
