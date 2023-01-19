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

// to nie działa. Czemu?
// const filterFn = (array, callback) => {
//   let finalArray = [];
//   for (let i = 0; i < array.length; i++) {
//     if (callback(array[i])) {
//       finalArray.push(array[i]);
//     }
//   }
//   return finalArray;
// };

const filterFn = (array, callback) => {
  let finalArray = [];
  for (let i = 0; i < array.length; i++) {
    const CurrenArrayVal = array[i];
    if (callback(CurrenArrayVal)) {
      finalArray.push(CurrenArrayVal);
    }
  }
  return finalArray;
};

const reduceFn = (array, callback, inital) => {};

const everyFn = (array, callback) => {};

const someFn = (array, callback) => {};
