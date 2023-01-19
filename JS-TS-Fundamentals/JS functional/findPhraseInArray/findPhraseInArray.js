// Stwórz tablicę z 15 losowymi, wybranymi przez ciebie wyrazami”(Muszą być typu string)
// Stwórz funkcję, która jako pierwszy argument przyjmuje tablicę wyrazów, a jako drugą wartość frazę, którą chcemy znaleźć w tej tablicy
// Jeżeli szukana przez nas fraza istnieje w tablicy to funkcja ma zwrócić jej wartość, a także indeks(pozycję) w tablicy.
// Jeżeli szukana fraza nie istnieje to funkcja ma zwrócić informację, że szukanej frazy nie ma w tablicy.

const arr = [
  'Lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'Vestibulum',
  'a',
  'est',
  'ut',
  'nisi',
  'vehicula',
  'placerat',
];

function findPhraseInArray(inputedArray, phrazeToFind) {
  if (!Array.isArray(inputedArray) || typeof phrazeToFind !== 'string') {
    return;
  }
  const phrazeToFindUpperedCaseCopy = phrazeToFind.toUpperCase();
  const inputedArrayUpperedCaseCopy = inputedArray.map((el) =>
    el.toUpperCase()
  );
  console.log(inputedArrayUpperedCaseCopy);
  let ResultArray = [];

  for (let i = 0; i < inputedArrayUpperedCaseCopy.length; i++) {
    if (inputedArrayUpperedCaseCopy[i].includes(phrazeToFindUpperedCaseCopy)) {
      ResultArray.push([i, inputedArray[i]]);
    }
  }

  return ResultArray.length > 0
    ? ResultArray
    : `i'm sorry. I cloudn't find any input that matched the ${phrazeToFind} phraze`;
}

// Sprawdzenie działania programu:
console.log(findPhraseInArray(arr, 'E'));
