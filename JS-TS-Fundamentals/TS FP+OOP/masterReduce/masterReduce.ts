// Za pomocą metody .reduce wbudowanej w array odtwórz działanie innych metod tablicowych
// Stwórz mapFn() – działa tak samo jak tablicowa metoda .map
// Stwórz filterFn() – działa tak samo jak metoda tablicy .filter
// Stwórz everyFn() – działa tak samo jak metoda tablicy .every
// Stwórz someFn() - działa tak samo jak metoda tablicy .some
[
  { a: 1, b: 2 },
  { a: 3, b: 4 },
].map((x) => x.a);

type S = unknown;

function mapFn<T>(
  array: Array<T>,
  callback: (currentValue: T, index: number, array: T[]) => S
) {
  let copiedArray = [...array];
  return copiedArray.reduce((accumulator: S[], currentValue, index, array) => {
    let modifiedValue = callback(currentValue, index, array);
    accumulator.push(modifiedValue);
    return accumulator;
  }, []);
}

function filterFn<T>(
  array: T[],
  callback: (currentValue: T, index: number, array: T[]) => boolean
) {
  let copiedArray = [...array];
  return copiedArray.reduce((accumulator: T[], currentValue, index, array) => {
    if (callback(currentValue, index, array)) accumulator.push(currentValue);
    return accumulator;
  }, []);
}

//   Sprawdzenie poprawności działania programu:
// let arr = [1, 2, 3, 4, 5, 6];
// let callback = (el) => el > 3;
// console.log(filterFn(arr, callback));

function everyFn<T>(
  array: T[],
  callback: (currentValue: T, index: number, array: T[]) => boolean
) {
  let copiedArray = array.reduce(
    (accumulator: T[], currentValue, index, array) => {
      if (callback(currentValue, index, array)) {
        accumulator.push(currentValue);
        return accumulator;
      } else {
        return accumulator;
      }
    },
    []
  );
  return copiedArray.length === array.length ? true : false;
}

//   Sprawdzenie poprawności działania programu:
// let arr = [1,2,3,4,5,6];
// let callback = (el) => typeof el === 'number';
// console.log(everyFn(arr, callback));

function someFn<T>(
  array: T[],
  callback: (currentValue: T, index: number, array: T[]) => boolean
) {
  let copiedArray = array.reduce(
    (accumulator: T[], currentValue, index, array) => {
      if (callback(currentValue, index, array)) {
        accumulator.push(currentValue);
        return accumulator;
      } else {
        return accumulator;
      }
    },
    []
  );
  return copiedArray.length > 0 ? true : false;
}
//   Sprawdzenie poprawności działania programu:
// let arr = [1, 2, 3, 4, 5, 6];
// let callback = (el) => typeof el === 'number';
// console.log(someFn(arr, callback));
