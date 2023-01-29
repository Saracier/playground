// Utwórz funkcję, która jako argument przyjmuje Twój rok urodzenia. Funkcja powinna zwrócić Twój aktualny wiek niezależnie od typu inputa, który otrzyma
//
// cd "C:\Users\Michał\Desktop\pgr\playground\JS-TS-Fundamentals\TS FP+OOP\getMyAge"
// tsc getMyAge.ts
function getMyAge(input) {
    if (typeof input !== 'string' &&
        typeof input !== 'number' &&
        !(input instanceof Date)) {
        console.log('wrong input');
        return;
    }
    //
    //
    //
    // Czy to naturalne, że komenda "tsc getMyAge.ts" nie działa mi w powershellu, a działa w bashu?
    //
    //
    //
    //
    var inputDate;
    if (typeof input === 'string' || typeof input === 'number') {
        if (typeof input === 'string') {
            input = parseInt(input);
        }
        //
        //
        // Dlaczego jeżeli ustawie na inputDate: Date, to wywala mi błąd, a przy number już jest git?
        // Przecież typescript po to ma specjalny typ "Date"
        //
        //
        //
        inputDate = new Date(input, 1, 1).getFullYear();
    }
    else {
        inputDate = input.getFullYear();
    }
    var currentDate = new Date().getFullYear();
    var currentAge = currentDate - inputDate;
    return currentAge;
}
// Sprawdzenie działania programu:
console.log(" Result 1 is: ".concat(getMyAge(new Date(1990, 1, 1))));
console.log(" Result 2 is: ".concat(getMyAge('1990')));
console.log(" Result 3 is: ".concat(getMyAge(1990)));
