'use strict';

!function () {
  var arr = [6, 4, 8, 3, 9, 10, 5, 2, 11, 46, 23, 5, 28];
  arr.sort((x, y) => x - y);

// arr is [ 2, 3, 4, 5, 5, 6, 8, 9, 10, 11, 23, 28, 46 ]
  console.log(arr);

  var text = '<&>"';

// &lt;&amp;&gt;&quot;
  console.log(text.replace(/[<&>"]/g, c => {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;'
    }[c];
  }));

  text = '<&>"';

// &lt;&amp;&gt;&quot;
  console.log(text.replace(/[<>&"]/g, c => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;'
  }[c])));
}();
