'use strict';

/**
 * Pseudoclassical
 */
!function () {

// We can define a constructor and augment its prototype.
  var Mammal = function (name) {
    this.name = name;
  };
  Mammal.prototype.get_name = function () {
    return this.name;
  };
  Mammal.prototype.says = function () {
    return this.saying || '';
  };

// Now, we can make an instance.
  var myMammal = new Mammal('Herb the Mammal');
  var name = myMammal.get_name(); // 'Herb the Mammal'
  
// We can make another pseudoclass that inherits from Mammal by
// defining its constructor function and replacing its prototype 
// with an instance of Mammal
  var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
  };

// Replace Cat.prototype with a new instance of Mammal
  Cat.prototype = new Mammal();

// Augment the new prototype wit purr and get_name methods.
  Cat.prototype.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };
  Cat.prototype.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
  };
  var myCat = new Cat('Henrietta');
  
// meow
  console.log(myCat.says()); 

// r-r-r-r-r
  console.log(myCat.purr(5)); 

// meow Henrietta meow
  console.log(myCat.get_name()); 
  

/**
 * The pseudoclassical pattern was intended to look sort fo object-oriented, 
 * but it is looking quite alien. 
 * We can hide some of the ugliness by using the method method and defining
 * an inherits method.
 */
  Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
  };
  Function.method('inherits', function (Parent) {
    this.prototype = new Parent();
    return this;
  });
  
/**
 * Our inherits and method methods return this, 
 * allowing us to program in a cascade style. 
 * We can now make our Cat with one statement.
 */
  var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
  }
    .inherits(Mammal)
    .method('purr', function (n) {
      var i, s = '';
      for (i = 0; i < n; i += 1) {
        if (s) {
          s += '-';
        }
        s += 'r';
      }
      return s;
    })
    .method('get_name', function () {
      return this.says() + ' ' + this.name + ' ' + this.says();
    });

  var kitty = new Cat('Kitty');

// meow Kitty meow
  console.log(kitty.get_name()); 

// r-r-r
  console.log(kitty.purr(3)); 

}();


/**
 * Functional
 */
!function () {
  var mammal = function (spec) {
    var that = {};
    
    that.get_name = function () {
      return spec.name;
    };

    that.says = function () {
      return spec.saying || '';
    };

    return that;
  }

  var myMammal = mammal({name: 'Herb'});

  var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function (n) {
      var i, s = '';
      for (i = 0;i < n; i += q) {
        if (s) {
          s += '-';
        }
        s += 'r';
      }
    };
    that.get_name = function () {
      return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
  };

  var myCat = cat({name: 'Henrietta'});

// meow Henrietta meow
  console.log(myCat.get_name()); 

/**
 * The functional pattern also gives us a way to deal with super methods.
 * We will make a superior method that takes a method name and returns a 
 * function that invokes that method.
 * The function will invoke the original method even if the property is changed.
 */
  Object.method('superior', function (name) {
    var that = this,
        method = that[name];
    return function () {
      return method.apply(that, arguments);
    };
  });

  var coolcat = function (spec) {
    var that = cat(spec),
        super_get_name = that.superior('get_name');
    that.get_name = function (n) {
      return 'like ' + super_get_name() + ' body';
    };
    return that;
  };

  var myCoolCat = coolcat({name: 'Bix'});

// like meow Bix meow body
  console.log(myCoolCat.get_name()); 
}();
