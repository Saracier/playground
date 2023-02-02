// Stwórz funkcję aggregateIntoChunks agregującą wszystkie elementy array na losowej długości chunki
// Każdy chunk powienien mieć od 4 do 7 elementów, ostatni chunk też powinien być długości od 4 do 7
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var aggregateIntoChunks2 = function (array) {
    var finalArray = [];
    var copiedArray = __spreadArray([], array, true);
    var helperArray = [];
    if (array.length <= 7) {
        return array;
    }
    main: for (var i = 0; i < array.length; i++) {
        var randomForThisIteration = generateRandom();
        helperArray.push(array[i]);
        if ((helperArray.length >= randomForThisIteration && Math.random() < 0.3) ||
            helperArray.length == 7) {
            finalArray.push(helperArray);
            helperArray = [];
        }
        if (i + 8 === array.length) {
            if (helperArray.length === 0) {
                for (var n = 0; n + i < array.length - 4; n++) {
                    helperArray.push(array[n + i]);
                }
                finalArray.push(helperArray);
                helperArray = [];
                for (var n = 0; n + i + 4 < array.length; n++) {
                    helperArray.push(array[n + i]);
                }
                finalArray.push(helperArray);
                helperArray = [];
                break main;
            }
        }
        if (array.length - 4 === i && helperArray.length < 2) {
            for (var n = 1; n + i < array.length; n++) {
                helperArray.push(array[n + i]);
            }
            finalArray.push(helperArray);
            helperArray = [];
            break main;
        }
        if (array.length === i) {
            finalArray.push(helperArray);
            helperArray = [];
        }
    }
    for (var i = 0; i < finalArray.length; i++) {
        if (finalArray[i].length < 4) {
            console.log('wyszła lipa');
        }
    }
    return finalArray;
};
var aggregateIntoChunks = function (array) {
    var finalArray = [];
    var helperArray = [];
    for (var i = 0; i < array.length; i++) {
        var randomForThisIteration = generateRandom();
        helperArray.push(array[i]);
        if ((helperArray.length >= randomForThisIteration && Math.random() < 0.3) ||
            helperArray.length == 7) {
            finalArray.push(helperArray);
            helperArray = [];
        }
    }
    for (var i = 0; i < finalArray.length; i++) {
        if (finalArray[i].length < 4) {
            finalArray = aggregateIntoChunks(array);
        }
    }
    return finalArray;
};
function generateRandom(min, max) {
    if (min === void 0) { min = 4; }
    if (max === void 0) { max = 7; }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Sprawdzenie działania funckji:
var alphabet = '12345678'.split('');
var chunks = aggregateIntoChunks2(alphabet);
console.log(chunks);
