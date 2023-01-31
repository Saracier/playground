// Napisz funkcje, w których wykorzystasz pętle for lub while w celu odwzorowania podanych niżej metod tablicowych:
//  .forEach
//  .map
//  .entries
//  .filter
//  .reduce
//  .every
//  .some

const forEachFn = <T>(
  array: T[],
  callback: (arg1: T, index?: number, array?: T[]) => void
) => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
  return;
};

const mapFn = <T>(
  array: T[],
  callback: (arg1: T, index?: number, array?: T[]) => T
) => {
  let finalArray: T[] = [];
  for (let i = 0; i < array.length; i++) {
    finalArray.push(callback(array[i], i, array));
  }
  return finalArray;
};

type entryInArray = number | string;

const entriesFn = (array: entryInArray[]) => {
  let finalArray: entryInArray[] = [];
  for (let i = 0; i < array.length; i++) {
    finalArray.push(`${i}, "${array[i]}"`);
  }
  return finalArray;
};

const filterFn = <T>(
  array: T[],
  callback: (arg1: T, index?: number, array?: T[]) => T
) => {
  let finalArray: T[] = [];
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    if (callback(currenArrayVal, i, array)) {
      finalArray.push(currenArrayVal);
    }
  }
  return finalArray;
};

const reduceFn = <T>(
  array: T[],
  callback: (arg1: T, arg2: T, index?: number, array?: T[]) => T,
  inital?: T | undefined
) => {
  let accumulator: T = inital ?? array[0];
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    accumulator = callback(accumulator, currenArrayVal, i, array);
  }
  return accumulator;
};

const everyFn = <T>(
  array: T[],
  callback: (
    arg1: T,
    index?: number,
    array?: T[]
  ) => T | undefined | null | boolean
) => {
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    if (!callback(currenArrayVal, i, array)) {
      return false;
    }
  }
  return true;
};

const someFn = <T>(
  array: T[],
  callback: (
    arg1: T,
    index?: number,
    array?: T[]
  ) => T | undefined | null | boolean
) => {
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    if (callback(currenArrayVal, i, array)) {
      return true;
    }
  }
  return false;
};
