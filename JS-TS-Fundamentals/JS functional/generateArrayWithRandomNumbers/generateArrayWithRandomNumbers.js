// Stare rozwiązanie. Nowe w "TS FP+OOP"

// Napisz funkcję generateArrayWithRandomNumbers, która zwróci tablicę o długości podanej jako „howManyNumbers”. Ta tablica musi zawierać w sobie losowe liczby z zakresu min i max.
//  Napisz funkcje generateArrayWithArrays, która wygeneruje array z arrayami pochodzącymi z poprzedniej funkcji

function generateArrayWithRandomNumbers(
  howManyNumbers,
  minNumbersAcceptedInArray,
  maxNumbersAcceptedInArray
) {
  if (
    typeof howManyNumbers !== 'number' ||
    typeof minNumbersAcceptedInArray !== 'number' ||
    typeof maxNumbersAcceptedInArray !== 'number'
  ) {
    return;
  }

  const finalArray = [];
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
  howManyArrays,
  howManyNumbers,
  minNumbersAcceptedInArray,
  maxNumbersAcceptedInArray
) {
  if (
    typeof howManyArrays !== 'number' ||
    typeof howManyNumbers !== 'number' ||
    typeof minNumbersAcceptedInArray !== 'number' ||
    typeof maxNumbersAcceptedInArray !== 'number'
  ) {
    return;
  }
  const finalArray = [];

  for (let i = 0; i < howManyArrays; i++) {
    const generatedArrayOnILoop = generateArrayWithRandomNumbers(
      howManyNumbers,
      minNumbersAcceptedInArray,
      maxNumbersAcceptedInArray
    );
    finalArray.push(generatedArrayOnILoop);
  }
  return finalArray;
}

// Sprawdzenie działania programu:
console.log(generateArrayOfArrays(5, 10, 1, 100));
