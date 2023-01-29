// Za pomocą metody .reduce wbudowanej w array odtwórz działanie innych metod tablicowych
// Stwórz mapFn() – działa tak samo jak tablicowa metoda .map
// Stwórz filterFn() – działa tak samo jak metoda tablicy .filter
// Stwórz everyFn() – działa tak samo jak metoda tablicy .every
// Stwórz someFn() - działa tak samo jak metoda tablicy .some

function mapFn<T>(
  array: Array<T>,
  callback: (currentValue: T, index: number, array: T[]) => T
) {
  let copiedArray = [...array];
  return copiedArray.reduce((accumulator: T[], currentValue, index, array) => {
    let modifiedValue = callback(currentValue, index, array);
    accumulator.push(modifiedValue);
    return accumulator;
  }, []);
}

function filterFn(array, callback) {
  let copiedArray = [...array];
  return copiedArray.reduce((accumulator, currentValue, index, array) => {
    if (callback(currentValue, index, array)) accumulator.push(currentValue);
    return accumulator;
  }, []);
}

//   Sprawdzenie poprawności działania programu:
// let arr = [1, 2, 3, 4, 5, 6];
// let callback = (el) => el > 3;
// console.log(filterFn(arr, callback));

function everyFn(array, callback) {
  let copiedArray = array.reduce((accumulator, currentValue, index, array) => {
    if (callback(currentValue, index, array)) {
      accumulator.push(currentValue);
      return accumulator;
    } else {
      return accumulator;
    }
  }, []);
  return copiedArray.length === array.length ? true : false;
}

//   Sprawdzenie poprawności działania programu:
// let arr = [1,2,3,4,5,6];
// let callback = (el) => typeof el === 'number';
// console.log(everyFn(arr, callback));

function someFn(array, callback) {
  let copiedArray = array.reduce((accumulator, currentValue, index, array) => {
    if (callback(currentValue, index, array)) {
      accumulator.push(currentValue);
      return accumulator;
    } else {
      return accumulator;
    }
  }, []);
  return copiedArray.length > 0 ? true : false;
}
//   Sprawdzenie poprawności działania programu:
// let arr = [1, 2, 3, 4, 5, 6];
// let callback = (el) => typeof el === 'number';
// console.log(someFn(arr, callback));
