// Stwórz klasę Switch, która służy do wielokrotnej, równorzędnej walidacji
//  Klasa ma mieć metode .add w której dodajemy warunek do sprawdzenia oraz callback, który ma się wywołać jeśli warunek zostanie spełniony
//  Klasa ma mieć metodę .isValid która iteruje po wszystkich cases sprawdzając każdy dodany wcześniej warunek
//  Klasa ma mieć metodę .isEmpty która sprawdza czy tablice cases i conditions są puste. Jeśli tak zwraca true
//  Metoda .isValid zwraca true jeśli wszystkie warunki będą na false. Jeżeli jakikolwiek warunek zostanie spełniony, funkcja przerywa swoje działanie, wywołując przekazany callback dla tego warunku. Po każdym wykonaniu metody warunki i callbacki są czyszczone.

type Condition = { condition: boolean; callback: () => void };

class Switch {
  conditions: Condition[] = []; // Czyli nasze warunki sprawdzające

  add(condition: boolean, callback: () => void) {
    this.conditions.push({
      condition: condition,
      callback: callback,
    });
  }

  isValid() {
    if (this.conditions.length === 0) return true;
    let flag = true;
    testloop: for (let i = 0; i < this.conditions.length; i++) {
      const conditionForThisLoop = this.conditions[i].condition;
      if (conditionForThisLoop) {
        flag = false;
        this.conditions[i].callback();
        break testloop;
      }
    }
    return flag;
  }
  isEmpty() {
    if (this.conditions.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}

// ma to działać tak:
const formChecker = new Switch();
const value = 'test@';

formChecker.add(value.length < 5, () => {
  console.error('value is too short');
});

formChecker.add(!value.includes('@'), () => {
  console.error('value is not an email');
});

// formChecker.isEmpty() === false
console.log(formChecker.isValid()); // === false
// console.error('value is to short')
// console.error('value is not an email')
// formChecker.isEmpty() === true
