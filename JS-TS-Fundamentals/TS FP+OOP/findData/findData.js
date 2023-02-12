// Napisz funkcję pozwalającą połączyć dane występujące w różnych tablicach w nowy obiekt.
// Dane należy połaczyć jeśli jakiekolwiek pola obiektów z tablic są identyczne, pod warunkiem że reszta pól nie koliduje ze sobą
// Funkcja powinna przyjmować tablicę obiektów jako argument.
// Nie wszystkie tablice mają tą samą długość, oraz nie każdy obiekt posiada tą samą ilość odpowiadających mu wartości.
// Z metod tablicowych skorzystaj tylko z metody reduce().
// Kawałek kodu dla lepszego początku!
// Przykładowe obiekty które funkcja powinna móc obsłużyć (pamiętaj by przekazać tablicę obiektów):
// - {id: 1, name: "Grzegorz"}
// - {name:"Grzegorz" , surname: "NieGrzegorz", animal: { name: "Czarny", age: 1} }
// - {id: 1, city: Gliwice }
// - {age: 1, color: Black }
// - {friends: [{id: 1241, name: Adam}]}
// - {name: Adam, lastName: "NieAdam" }
// Wynikiem złączenia tablic takich obiektów powinno być:
// - {id: 1, name: "Grzegorz", surname: "NieGrzegorz", animal : {name: "Czarny", age: 1 , color: Black}, city: Gliwice}
// - {id: 1241, name: Adam, lastName: "NieAdam" }
// - {friends: [{id: 1241, name: Adam}]}
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function mergeObjects(input) {
    var final = input.reduce(function (accumulator, currentValue, currentIndex, array) {
        // const accEntries = Object.entries(accumulator) //array key value
        var accEntries = Object.entries(accumulator.reduce(function (acc, CV) {
            var entries = Object.entries(CV);
            acc = __assign(__assign({}, acc), entries);
            return acc;
        }, [])); //array key value z acc
        var curValEntries = Object.entries(currentValue); //array key value z CV
        // Object.keys(input[currentIndex])
        for (var i = 0; i < accEntries.length; i++) {
            for (var x = 0; x < curValEntries.length; i++) {
                var str1 = "".concat(accEntries[i][0], ": ").concat(accEntries[i][1]);
                var str2 = "".concat(curValEntries[x][0], ": ").concat(curValEntries[x][1]);
                if (str1 === str2) {
                    accumulator[currentIndex] = __assign(__assign({}, accumulator[currentIndex]), currentValue);
                    return accumulator;
                }
            }
        }
        return __spreadArray(__spreadArray([], accumulator, true), [currentValue], false);
    }, []);
    return final;
}
// Sprawdzenie poprawności działania programu
var arg = [
    { id: 1, name: 'Grzegorz' },
    {
        name: 'Grzegorz',
        surname: 'NieGrzegorz',
        animal: { name: 'Czarny', age: 1 }
    },
    { id: 1, city: 'Gliwice' },
    { age: 1, color: 'Black' },
    { friends: [{ id: 1241, name: 'Adam' }] },
    { name: 'Adam', lastName: 'NieAdam' },
];
console.log(mergeObjects(arg));
// Wynikiem złączenia tablic takich obiektów powinno być:
// {id: 1, name: "Grzegorz", surname: "NieGrzegorz", animal : {name: "Czarny", age: 1 , color: Black}, city: Gliwice}
// {id: 1241, name: Adam, lastName: "NieAdam" }
// {friends: [{id: 1241, name: Adam}]}
