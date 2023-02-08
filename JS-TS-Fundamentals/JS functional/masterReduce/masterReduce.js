// Stare rozwiązanie. Nowe w "TS FP+OOP"

// Za pomocą metody .reduce wbudowanej w array odtwórz działanie innych metod tablicowych
// Stwórz mapFn() – działa tak samo jak tablicowa metoda .map
// Stwórz filterFn() – działa tak samo jak metoda tablicy .filter
// Stwórz everyFn() – działa tak samo jak metoda tablicy .every
// Stwórz someFn() - działa tak samo jak metoda tablicy .some

function mapFn(array, callback) {
  let copiedArray = [...array];
  return copiedArray.reduce((accumulator, currentValue, indeks, array) => {
    let modifiedValue = callback(currentValue, indeks, array);
    accumulator.push(modifiedValue);
    return accumulator;
  }, []);
}

function filterFn(array, callback) {
  let copiedArray = [...array];
  return copiedArray.reduce((accumulator, currentValue, indeks, array) => {
    if (callback(currentValue, indeks, array)) accumulator.push(currentValue);
    return accumulator;
  }, []);
}

function everyFn(array, callback) {
  let copiedArray = array.reduce((accumulator, currentValue, indeks, array) => {
    if (callback(currentValue, indeks, array)) {
      accumulator.push(currentValue);
      return accumulator;
    } else {
      return accumulator;
    }
  }, []);
  return copiedArray.length === array.length ? true : false;
}

function someFn(array, callback) {
  let copiedArray = array.reduce((accumulator, currentValue, indeks, array) => {
    if (callback(currentValue, indeks, array)) {
      accumulator.push(currentValue);
      return accumulator;
    } else {
      return accumulator;
    }
  }, []);
  return copiedArray.length > 0 ? true : false;
}
