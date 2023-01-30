// Za pomocą metody .reduce wbudowanej w array odtwórz działanie innych metod tablicowych
// Stwórz mapFn() – działa tak samo jak tablicowa metoda .map
// Stwórz filterFn() – działa tak samo jak metoda tablicy .filter
// Stwórz everyFn() – działa tak samo jak metoda tablicy .every
// Stwórz someFn() - działa tak samo jak metoda tablicy .some
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function mapFn(array, callback) {
    var copiedArray = __spreadArray([], array, true);
    return copiedArray.reduce(function (accumulator, currentValue, index, array) {
        var modifiedValue = callback(currentValue, index, array);
        accumulator.push(modifiedValue);
        return accumulator;
    }, []);
}
function filterFn(array, callback) {
    var copiedArray = __spreadArray([], array, true);
    return copiedArray.reduce(function (accumulator, currentValue, index, array) {
        if (callback(currentValue, index, array))
            accumulator.push(currentValue);
        return accumulator;
    }, []);
}
//   Sprawdzenie poprawności działania programu:
// let arr = [1, 2, 3, 4, 5, 6];
// let callback = (el) => el > 3;
// console.log(filterFn(arr, callback));
function everyFn(array, callback) {
    var copiedArray = array.reduce(function (accumulator, currentValue, index, array) {
        if (callback(currentValue, index, array)) {
            accumulator.push(currentValue);
            return accumulator;
        }
        else {
            return accumulator;
        }
    }, []);
    return copiedArray.length === array.length ? true : false;
}
//   Sprawdzenie poprawności działania programu:
// let arr = [1,2,3,4,5,6];
// let callback = (el) => typeof el === 'number';
// console.log(everyFn(arr, callback));
function someFn(array, callback) {
    var copiedArray = array.reduce(function (accumulator, currentValue, index, array) {
        if (callback(currentValue, index, array)) {
            accumulator.push(currentValue);
            return accumulator;
        }
        else {
            return accumulator;
        }
    }, []);
    return copiedArray.length > 0 ? true : false;
}
//   Sprawdzenie poprawności działania programu:
// let arr = [1, 2, 3, 4, 5, 6];
// let callback = (el) => typeof el === 'number';
// console.log(someFn(arr, callback));
