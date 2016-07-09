if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}

var stooge = {
  'first-name': 'Jerome',
  'last-name': 'Howard'
};

stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';

console.log(stooge);
/*
{ 'first-name': 'Jerome',
  'last-name': 'Howard',
  'middle-name': 'Lester',
  nickname: 'Curly' }
*/

var another_stooge = Object.create(stooge);
console.log(another_stooge); // {}
console.log(another_stooge.nickname); // Curly

another_stooge.nickname = 'Moe';
console.log(stooge.nickname); // Curly
console.log(another_stooge.nickname); // Moe

stooge.profession = 'actor';
console.log(stooge.profession); // actor
console.log(another_stooge.profession); // actor

console.log(another_stooge); // { nickname: 'Moe' }

stooge['middle-name'] = 'stooge';
console.log(another_stooge['middle-name']); // stooge
