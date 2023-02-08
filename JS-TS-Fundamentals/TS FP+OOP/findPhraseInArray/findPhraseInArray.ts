// Stwórz tablicę z 15 losowymi, wybranymi przez ciebie wyrazami”(Muszą być typu string)
// Stwórz funkcję, która jako pierwszy argument przyjmuje tablicę wyrazów, a jako drugą wartość frazę, którą chcemy znaleźć w tej tablicy
// Jeżeli szukana przez nas fraza istnieje w tablicy to funkcja ma zwrócić jej wartość, a także indeks(pozycję) w tablicy.
// Jeżeli szukana fraza nie istnieje to funkcja ma zwrócić informację, że szukanej frazy nie ma w tablicy.
//
// tsc findPhraseInArray.ts

type singleResultArray = [number, string];

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

function findPhraseInArray(inputedArray: string[], phraseToFind: string) {
  if (!Array.isArray(inputedArray) || typeof phraseToFind !== 'string') {
    return "i'm sorry. You have given wrong input values";
  }
  const phrazeToFindUpperedCaseCopy = phraseToFind.toUpperCase();
  const inputedArrayUpperedCaseCopy = inputedArray.map((el) =>
    el.toUpperCase()
  );
  let resultArray: singleResultArray[] = [];

  for (let i = 0; i < inputedArrayUpperedCaseCopy.length; i++) {
    if (
      inputedArrayUpperedCaseCopy[i].search(phrazeToFindUpperedCaseCopy) >= 0
    ) {
      resultArray.push([i, inputedArray[i]]);
    }
  }

  return resultArray.length > 0
    ? resultArray
    : `i'm sorry. I cloudn't find any input that matched the ${phraseToFind} phraze`;
}

// Sprawdzenie działania programu:
console.log(findPhraseInArray(arr, 'E'));
