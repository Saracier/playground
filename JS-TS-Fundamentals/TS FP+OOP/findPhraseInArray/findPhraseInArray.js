// Stwórz tablicę z 15 losowymi, wybranymi przez ciebie wyrazami”(Muszą być typu string)
// Stwórz funkcję, która jako pierwszy argument przyjmuje tablicę wyrazów, a jako drugą wartość frazę, którą chcemy znaleźć w tej tablicy
// Jeżeli szukana przez nas fraza istnieje w tablicy to funkcja ma zwrócić jej wartość, a także indeks(pozycję) w tablicy.
// Jeżeli szukana fraza nie istnieje to funkcja ma zwrócić informację, że szukanej frazy nie ma w tablicy.
//
// tsc findPhraseInArray.ts
var arr = [
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
function findPhraseInArray(inputedArray, phraseToFind) {
    if (!Array.isArray(inputedArray) || typeof phraseToFind !== 'string') {
        return "i'm sorry. You have given wrong input values";
    }
    var phrazeToFindUpperedCaseCopy = phraseToFind.toUpperCase();
    var inputedArrayUpperedCaseCopy = inputedArray.map(function (el) {
        return el.toUpperCase();
    });
    var resultArray = [];
    for (var i = 0; i < inputedArrayUpperedCaseCopy.length; i++) {
        //
        //
        //
        //
        //
        //
        // Wcześniej ta linijka działała z includes. Czemu teraz tsc mi wywala błąd, mimo, że paca?
        if (inputedArrayUpperedCaseCopy[i].includes(phrazeToFindUpperedCaseCopy)) {
            // if (
            //   inputedArrayUpperedCaseCopy[i].search(phrazeToFindUpperedCaseCopy) >= 0
            // ) {
            resultArray.push([i, inputedArray[i]]);
        }
    }
    return resultArray.length > 0
        ? resultArray
        : "i'm sorry. I cloudn't find any input that matched the ".concat(phraseToFind, " phraze");
}
// Sprawdzenie działania programu:
console.log(findPhraseInArray(arr, 'E'));
