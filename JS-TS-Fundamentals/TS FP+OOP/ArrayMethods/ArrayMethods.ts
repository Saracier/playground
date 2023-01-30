// Napisz funkcje, w których wykorzystasz pętle for lub while w celu odwzorowania podanych niżej metod tablicowych:
//  .forEach
//  .map
//  .entries
//  .filter
//  .reduce
//  .every
//  .some

const forEachFn = <T>(array: T[], callback: (arg1: T) => void) => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
  return;
};

const mapFn = <T>(array: T[], callback: (arg1: T) => T) => {
  let finalArray: T[] = [];
  for (let i = 0; i < array.length; i++) {
    finalArray.push(callback(array[i]));
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

const filterFn = <T>(array: T[], callback: (arg1: T) => T) => {
  let finalArray: T[] = [];
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    if (callback(currenArrayVal)) {
      finalArray.push(currenArrayVal);
    }
  }
  return finalArray;
};

//
// Nie wiem jak usunąć ten błąd cholibka
//
const reduceFn = <T>(
  array: T[],
  callback: (arg1: T, arg2: T) => T,
  inital: T
) => {
  let accumulator: T | undefined;
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    if (i === 0) {
      accumulator = inital;
      accumulator = callback(accumulator, currenArrayVal);
    } else {
      accumulator = callback(accumulator, currenArrayVal);
    }
  }
  return accumulator;
};

const everyFn = <T>(
  array: T[],
  callback: (arg1: T) => T | undefined | null | boolean
) => {
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    if (!callback(currenArrayVal)) {
      return false;
    }
  }
  return true;
};

const someFn = <T>(
  array: T[],
  callback: (arg1: T) => T | undefined | null | boolean
) => {
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    if (callback(currenArrayVal)) {
      return true;
    }
  }
  return false;
};
