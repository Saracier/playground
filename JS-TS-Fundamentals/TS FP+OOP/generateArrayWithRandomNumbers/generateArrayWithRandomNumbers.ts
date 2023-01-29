// Napisz funkcję generateArrayWithRandomNumbers, która zwróci tablicę o długości podanej jako „howManyNumbers”. Ta tablica musi zawierać w sobie losowe liczby z zakresu min i max.
//  Napisz funkcje generateArrayWithArrays, która wygeneruje array z arrayami pochodzącymi z poprzedniej funkcji
//
// tsc generateArrayWithRandomNumbers.ts

function generateArrayWithRandomNumbers(
  howManyNumbers: number,
  minNumbersAcceptedInArray: number,
  maxNumbersAcceptedInArray: number
) {
  if (
    typeof howManyNumbers !== 'number' ||
    typeof minNumbersAcceptedInArray !== 'number' ||
    typeof maxNumbersAcceptedInArray !== 'number'
  ) {
    return;
  }

  const finalArray: number[] = [];
  while (finalArray.length < howManyNumbers) {
    const randomGeneratedNumber =
      Math.floor(
        Math.random() * (maxNumbersAcceptedInArray - minNumbersAcceptedInArray)
      ) + minNumbersAcceptedInArray;
    finalArray.push(randomGeneratedNumber);
  }
  return finalArray;
}

function generateArrayOfArrays(
  howManyArrays: number,
  howManyNumbers: number,
  minNumbersAcceptedInArray: number,
  maxNumbersAcceptedInArray: number
) {
  if (
    typeof howManyArrays !== 'number' ||
    typeof howManyNumbers !== 'number' ||
    typeof minNumbersAcceptedInArray !== 'number' ||
    typeof maxNumbersAcceptedInArray !== 'number'
  ) {
    return;
  }
  const finalArray: number[][] = [];

  for (let i = 0; i < howManyArrays; i++) {
    const generatedArrayOnILoop = generateArrayWithRandomNumbers(
      howManyNumbers,
      minNumbersAcceptedInArray,
      maxNumbersAcceptedInArray
    );
    if (generatedArrayOnILoop) {
      finalArray.push(generatedArrayOnILoop);
    }
  }
  return finalArray;
}

// Sprawdzenie działania programu:
console.log(generateArrayOfArrays(5, 10, 1, 100));
