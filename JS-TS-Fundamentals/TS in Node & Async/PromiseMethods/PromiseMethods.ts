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

const promiseAll = async (arrayOfPromise: Promise<any>[]) => {
  // Działa, ale nie trzyma kolejności promisów, to ważne w Promise.All. Lepiej korzystać z promiseAll2
  return new Promise(async (resolve, reject) => {
    const returnArray: any[] = new Array(arrayOfPromise.length);
    try {
      arrayOfPromise.forEach(async (element, index) => {
        returnArray[index] = await element;
        if (returnArray.length == arrayOfPromise.length) {
          resolve(returnArray);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

const promiseAll2 = async (arrayOfPromise: Promise<any>[]) => {
  let returnArray: Promise<any>[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      arrayOfPromise.reduce(async (acc: Promise<any>, curr: any) => {
        const res = await curr;
        await acc;
        returnArray.push(res);
        if (returnArray.length == arrayOfPromise.length) {
          resolve(returnArray);
        }
        return acc;
      }, Promise.resolve(0));
    } catch (err) {
      reject(err);
    }
  });
};

const promiseRace = async (arrayOfPromise: Promise<any>[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      arrayOfPromise.forEach(async (element) => {
        const res = await element;
        resolve(res);
      });
    } catch (err) {
      reject(err);
    }
  });
};

const promiseLast = (arrayOfPromise: Promise<any>[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      const returnArray: any[] = [];
      arrayOfPromise.forEach(async (element) => {
        const res = await element;
        returnArray.push(res);
        if (returnArray.length == arrayOfPromise.length) {
          resolve(returnArray.pop());
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

const promiseIgnoreErrors = (arrayOfPromise: Promise<any>[]) => {
  return new Promise(async (resolve) => {
    const returnArray: any[] = [];
    arrayOfPromise.forEach(async (element) => {
      try {
        const res = await element;
        returnArray.push(res);
        if (returnArray.length == arrayOfPromise.length) {
          resolve(returnArray);
        }
      } catch (err) {
        returnArray.push(err);
      } finally {
        if (returnArray.length == arrayOfPromise.length) {
          resolve(returnArray);
        }
      }
    });
  });
};

// https://advancedweb.hu/asynchronous-array-functions-in-javascript/

const promise1 = Promise.resolve(3);
// const promise1 = Promise.reject(3);
const promise3 = 42;
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'to ma być drugie');
});

promiseIgnoreErrors([promise1, promise2, promise3]).then((values) => {
  console.log('sprawdzenie finalne', values);
});
