// Napisz funkcje, w których wykorzystasz pętle for lub while w celu odwzorowania podanych niżej metod tablicowych:
//  .forEach
//  .map
//  .entries
//  .filter
//  .reduce
//  .every
//  .some

const forEachFn = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
  return;
};

const mapFn = (array, callback) => {
  let finalArray = [];
  for (let i = 0; i < array.length; i++) {
    finalArray.push(callback(array[i]));
  }
  return finalArray;
};

const entriesFn = (array) => {
  let finalArray = [];
  for (let i = 0; i < array.length; i++) {
    finalArray.push(`${i}, "${array[i]}"`);
  }
  return finalArray;
};

const filterFn = (array, callback) => {
  let finalArray = [];
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    if (callback(currenArrayVal)) {
      finalArray.push(currenArrayVal);
    }
  }
  return finalArray;
};

const reduceFn = (array, callback, inital) => {
  let accumulator;
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

const everyFn = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    if (!callback(currenArrayVal)) {
      return false;
    }
  }
  return true;
};

const someFn = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    const currenArrayVal = array[i];
    if (callback(currenArrayVal)) {
      return true;
    }
  }
  return false;
};
