// Stwórz funkcję aggregateIntoChunks agregującą wszystkie elementy array na losowej długości chunki
// Każdy chunk powienien mieć od 4 do 7 elementów, ostatni chunk też powinien być długości od 4 do 7

const aggregateIntoChunks = (array) => {
  let finalArray = [];
  let randomForThisIteration;
  let helperArray = [];
  for (let i = 0; i < array.length; i++) {
    randomForThisIteration = generateRandom();
    helperArray.push(array[i]);
    if (
      (helperArray.length >= randomForThisIteration && Math.random() < 0.3) ||
      helperArray.length == 7
    ) {
      finalArray.push(helperArray);
      helperArray = [];
    }
  }
  for (let i = 0; i < finalArray.length; i++) {
    if (finalArray[i].length < 4) {
      finalArray = aggregateIntoChunks(array);
    }
  }
  return finalArray;
};

function generateRandom(min = 4, max = 7) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Sprawdzenie działania funckji:
const alphabet = 'abcdefghijklmnoprstuwxyz'.split('');
const chunks = aggregateIntoChunks(alphabet);
console.log(chunks);
