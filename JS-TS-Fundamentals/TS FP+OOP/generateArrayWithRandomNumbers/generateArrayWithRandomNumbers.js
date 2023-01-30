// Napisz funkcję generateArrayWithRandomNumbers, która zwróci tablicę o długości podanej jako „howManyNumbers”. Ta tablica musi zawierać w sobie losowe liczby z zakresu min i max.
//  Napisz funkcje generateArrayWithArrays, która wygeneruje array z arrayami pochodzącymi z poprzedniej funkcji
//
//
//
//
//
// https://github.com/labs42io/clean-code-typescript#set-default-objects-with-objectassign-or-destructuring
// Czemu uzywac objec assignesa?
//
//
//
//
//

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
  var finalArray = [];
  while (finalArray.length < howManyNumbers) {
    var randomGeneratedNumber =
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
  var finalArray = [];
  for (var i = 0; i < howManyArrays; i++) {
    var generatedArrayOnILoop = generateArrayWithRandomNumbers(
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
