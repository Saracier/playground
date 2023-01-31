// Napisz funkcje, w których wykorzystasz pętle for lub while w celu odwzorowania podanych niżej metod tablicowych:
//  .forEach
//  .map
//  .entries
//  .filter
//  .reduce
//  .every
//  .some
var forEachFn = function (array, callback) {
    for (var i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
    return;
};
var mapFn = function (array, callback) {
    var finalArray = [];
    for (var i = 0; i < array.length; i++) {
        finalArray.push(callback(array[i], i, array));
    }
    return finalArray;
};
var entriesFn = function (array) {
    var finalArray = [];
    for (var i = 0; i < array.length; i++) {
        finalArray.push("".concat(i, ", \"").concat(array[i], "\""));
    }
    return finalArray;
};
var filterFn = function (array, callback) {
    var finalArray = [];
    for (var i = 0; i < array.length; i++) {
        var currenArrayVal = array[i];
        if (callback(currenArrayVal, i, array)) {
            finalArray.push(currenArrayVal);
        }
    }
    return finalArray;
};
var reduceFn = function (array, callback, inital) {
    var accumulator = inital !== null && inital !== void 0 ? inital : array[0];
    for (var i = 0; i < array.length; i++) {
        var currenArrayVal = array[i];
        accumulator = callback(accumulator, currenArrayVal, i, array);
    }
    return accumulator;
};
var everyFn = function (array, callback) {
    for (var i = 0; i < array.length; i++) {
        var currenArrayVal = array[i];
        if (!callback(currenArrayVal, i, array)) {
            return false;
        }
    }
    return true;
};
var someFn = function (array, callback) {
    for (var i = 0; i < array.length; i++) {
        var currenArrayVal = array[i];
        if (callback(currenArrayVal, i, array)) {
            return true;
        }
    }
    return false;
};
