// Wypracuj funkcje, które odwzorowują działanie metod promisowych + według mnie promisy powinny posiadać jeszczę dwie dodatkowe metody(Wszystko opisane dokładniej poniżej w kodzie)
// Wypracowanie funkcji promise.all(arrayOfPromises)
// Wypracowanie funkcji promise.race(arrayOfPromises)
// Wypracowanie funkcji promise.last(arrayOfPromise)
// Wypracowanie funkcji promise.ignoreErrors(arrayOfPromise)
// Wykonaj zadanie przy pomocy operatorów async/await i bez nich

// Promise.last(arrayOfPromise) - zwraca do then tylko ostatnią promisę, która się wykonała asynchronicznie,
// a jeśli wystąpił błąd w co najmniej jednej promisę, zwraca do catch ten błąd po ukończeniu ostatniej promisy

// Promise.ignoreErrors(arrayOfPromise) - nie ważne co się stanie,
// zwracane są tylko te wyniki promise, które zakończyły się sukcesem, błędy są ignorowane

// skopiuj identyczne działanie tych metod w funkcjach
const promiseAll = async (arrayOfPromise: Promise<unknown>[]) => {
  let returnArray: any[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      returnArray = await arrayOfPromise.map(async (element) => {
        const res = await element;
        return res;
      });
      resolve(returnArray);
    } catch (err) {
      reject(err);
    }
  });
};

const promiseRace = async (arrayOfPromise: Promise<unknown>[]) => {
  let returnValue: any;
  return new Promise(async (resolve, reject) => {
    try {
      returnValue = arrayOfPromise.map((element) => {
        const res = element;
        return res;
      });
      const finalValue = await returnValue;
      resolve(finalValue);
    } catch (err) {
      reject(err);
    }
  });
};

const promiseLast = (arrayOfPromise) => {
  return new Promise((resolve, reject) => {
    // ...
  });
};

const promiseIgnoreErrors = (arrayOfPromise) => {
  return new Promise((resolve, reject) => {
    // ...
  });
};
