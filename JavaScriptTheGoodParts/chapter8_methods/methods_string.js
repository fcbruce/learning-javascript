'use strict';

/**
 * string.charAt(pos)
 * string.charCode(pos)
 * string.concat(string...)
 * string.indexOf(searchString, position)
 * string.lastIndexOf(searchString, position)
 * string.localeCompare(that)
 * string.match(regexp)
 * string.replace(searchValue, replaceValue)
 * string.search(regexp)
 * string.slice(start, end)
 * string.split(separator, limit)
 * string.substring(start, end)
 * string.toLocaleLowerCase()
 * string.toLocaleUpperCase()
 * string.toLowerCase()
 * string.toUpperCase()
 * String.fromCharCode(char...)
 */
!function () {
  var name = 'Curly';

// C
  console.log(name.charAt(0));

// 67
  console.log(name.charCodeAt(0));

// Cat
  console.log('C'.concat('a', 't'));

// Catt
  console.log('C'.concat('at', 't'));

  var text = 'Mississippi';

// 2
  console.log(text.indexOf('ss'));

// 5
  console.log(text.indexOf('ss', 3));

// -1
  console.log(text.indexOf('ss', 6));

// 5
  console.log(text.lastIndexOf('ss'));

// 2
  console.log(text.lastIndexOf('ss', 3));

// 5
  console.log(text.lastIndexOf('ss', 6));

  var text = '<html><body bgcolor=linen><p>' + 
        'This is <b>bold<\/b>!<\/p><\/body><\/html>';
  var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
  var a, i;
  a = text.match(tags);

// [ 0 ] <html>
// [ 1 ] <body bgcolor=linen>
// [ 2 ] <p>
// [ 3 ] This is
// [ 4 ] <b>
// [ 5 ] bold
// [ 6 ] </b>
// [ 7 ] !
// [ 8 ] </p>
// [ 9 ] </body>
// [ 10 ] </html>
  for (i = 0; i < a.length; i += 1) {
    console.log('[ ' + i + ' ] ' + a[i]);
  }

  var oldareacode = /\((\d{3})\)/g;
  var p = '333-444(555)666-1212'.replace(oldareacode, '-$1-');

// 333-444-555-666-1212
  console.log(p);

  p = '333-444(555)666-1212'.replace(oldareacode, '-$&-');

// 333-444-(555)-666-1212
  console.log(p);

  p = '333-444(555)666-1212'.replace(oldareacode, '-$`-');

// 333-444-333-444-666-1212
  console.log(p);

  p = '333-444(555)666-1212'.replace(oldareacode, '-$\'-');

// 333-444-666-1212-666-1212
  console.log(p);

  p = '333-444(555)666-1212'.replace(oldareacode, '-$$-');

// 333-444-$-666-1212
  console.log(p);

  text = 'abcdefhij';
  var reg = /([a-z])([a-z])([a-z])/g;

// len = 6
// [ 0 ] abc
// [ 1 ] a
// [ 2 ] b
// [ 3 ] c
// [ 4 ] 0
// [ 5 ] abcdefhij
// len = 6
// [ 0 ] def
// [ 1 ] d
// [ 2 ] e
// [ 3 ] f
// [ 4 ] 3
// [ 5 ] abcdefhij
// len = 6
// [ 0 ] hij
// [ 1 ] h
// [ 2 ] i
// [ 3 ] j
// [ 4 ] 6
// [ 5 ] abcdefhij
  p = text.replace(reg, function () {
    console.log('len = ' + arguments.length);
    for (let i in arguments) {
      console.log('[ ' + i + ' ] ' + arguments[i]);
    }
  });

  
  text = 'This is a text';
  reg = /text/;

// 10
  console.log(text.search(reg));

  var digits = '0123456789';

// [ '0', '1', '2', '3', '4' ]
  console.log(digits.split('', 5));

// [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
  console.log(digits.split('', 100));

  var ip = '192.168.1.0';

// [ '192', '168', '1', '0' ]
  console.log(ip.split('.'));

  text = '.123,123.456;789.';

// [ '.123,123.456;789.' ]
  console.log(text.split('.,;'));

// [ '', '123', '123', '456', '789', '' ]
  console.log(text.split(/[,.;]/));

}();
