// Stwórz funkcję aggregateIntoChunks agregującą wszystkie elementy array na losowej długości chunki
// Każdy chunk powienien mieć od 4 do 7 elementów, ostatni chunk też powinien być długości od 4 do 7

// aggregateIntoChunks2 nie działa. Warunki na awaryjne przerwanie są skopane. korzystać ze zwyklego aggregateIntoChunks
const aggregateIntoChunks2 = (array: string[]) => {
  let finalArray: string[][] = [];
  let copiedArray = [...array];
  let helperArray: string[] = [];
  if (array.length <= 7) {
    return array;
  }

  main: for (let i = 0; i < array.length; i++) {
    let randomForThisIteration = generateRandom();
    helperArray.push(array[i]);
    if (
      (helperArray.length >= randomForThisIteration && Math.random() < 0.3) ||
      helperArray.length == 7
    ) {
      finalArray.push(helperArray);
      helperArray = [];
    }
    if (i + 8 === array.length) {
      if (helperArray.length === 0) {
        for (let n = 0; n + i < array.length - 4; n++) {
          helperArray.push(array[n + i]);
        }
        finalArray.push(helperArray);
        helperArray = [];
        for (let n = 0; n + i + 4 < array.length; n++) {
          helperArray.push(array[n + i]);
        }
        finalArray.push(helperArray);
        helperArray = [];
        break main;
      }
    }
    if (array.length - 4 === i && helperArray.length < 2) {
      for (let n = 0; n + i < array.length; n++) {
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

  for (let i = 0; i < finalArray.length; i++) {
    if (finalArray[i].length < 4) {
      console.log('wyszła lipa');
    }
  }

  return finalArray;
};

const aggregateIntoChunks = (array: string[]) => {
  let finalArray: string[][] = [];
  let helperArray: string[] = [];
  for (let i = 0; i < array.length; i++) {
    let randomForThisIteration = generateRandom();
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
const alphabet = 'abl'.split('');
const chunks = aggregateIntoChunks2(alphabet);
console.log(chunks);
