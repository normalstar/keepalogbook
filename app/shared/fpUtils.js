/**
 * Some utils to turn common lodash functions into curried ones with reversed
 * args.
 */

'use strict';

var _findIndex = require('lodash/array/findIndex');
var rearg = require('lodash/function/rearg');
var curry = require('lodash/function/curry');
var ary = require('lodash/function/ary');

function transformFp(func) {
  var reArgedFunc = rearg(func, [1, 0]);
  var arried = ary(reArgedFunc, 2);
  return curry(arried, 2);
}

// function transformFp3(func: Function) {
//   var reArgedFunc = rearg(func, [2, 0, 1]);
//   var arried = ary(reArgedFunc, 3);
//   return curry(arried, 3);
// }

var isPropEq = curry(function(valueToCompare, prop, item) {
  return valueToCompare === item[prop];
});

module.exports = {
  fp: {
    findIndex: transformFp(_findIndex),
    isPropEq
  }
};