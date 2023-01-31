// Stwórz funkcję aggregateIntoChunks agregującą wszystkie elementy array na losowej długości chunki
// Każdy chunk powienien mieć od 4 do 7 elementów, ostatni chunk też powinien być długości od 4 do 7
var aggregateIntoChunks = function (array) {
    var finalArray = [];
    var helperArray = [];
    for (var i = 0; i < array.length; i++) {
        var randomForThisIteration = generateRandom();
        helperArray.push(array[i]);
        if ((helperArray.length >= randomForThisIteration && Math.random() < 0.3) ||
            helperArray.length == 7 || array[i + 1] == 'undefined') {
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
var alphabet = 'abcdl'.split('');
var chunks = aggregateIntoChunks(alphabet);
console.log(chunks);
