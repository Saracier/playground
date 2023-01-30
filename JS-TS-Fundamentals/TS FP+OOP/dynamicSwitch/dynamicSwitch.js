// Stwórz klasę Switch, która służy do wielokrotnej, równorzędnej walidacji
//  Klasa ma mieć metode .add w której dodajemy warunek do sprawdzenia oraz callback, który ma się wywołać jeśli warunek zostanie spełniony
//  Klasa ma mieć metodę .isValid która iteruje po wszystkich cases sprawdzając każdy dodany wcześniej warunek
//  Klasa ma mieć metodę .isEmpty która sprawdza czy tablice cases i conditions są puste. Jeśli tak zwraca true
//  Metoda .isValid zwraca true jeśli wszystkie warunki będą na false. Jeżeli jakikolwiek warunek zostanie spełniony, funkcja przerywa swoje działanie, wywołując przekazany callback dla tego warunku. Po każdym wykonaniu metody warunki i callbacki są czyszczone.
var Switch = /** @class */ (function () {
    function Switch() {
        this.conditions = []; // Czyli nasze warunki sprawdzające
    }
    Switch.prototype.add = function (condition, callback) {
        this.conditions.push({
            condition: condition,
            callback: callback
        });
    };
    Switch.prototype.isValid = function () {
        if (this.conditions.length === 0)
            return true;
        var flag = true;
        testloop: for (var i = 0; i < this.conditions.length; i++) {
            var conditionForThisLoop = this.conditions[i].condition;
            if (conditionForThisLoop) {
                flag = false;
                this.conditions[i].callback();
                break testloop;
            }
        }
        return flag;
    };
    Switch.prototype.isEmpty = function () {
        if (this.conditions.length === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return Switch;
}());
// ma to działać tak:
var formChecker = new Switch();
var value = 'test@';
formChecker.add(value.length < 5, function () {
    console.error('value is too short');
});
formChecker.add(!value.includes('@'), function () {
    console.error('value is not an email');
});
// formChecker.isEmpty() === false
console.log(formChecker.isValid()); // === false
// console.error('value is to short')
// console.error('value is not an email')
// formChecker.isEmpty() === true
