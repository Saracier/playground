//  Stwórz funkcję tworzącą promisę o nazwie recursivePromise(arrayOfPromises), którą przyjmuję jako argument listę z promisami.
//  Na potrzeby zadania zakładamy, że każdy z elementów arrayOfPromises jest promisem i elementów w arrayOfPromises jest minimum 7.
//  Promisy z listy mają się wywoływać kolejna po zakończeniu poprzedniej, a ostatnia ma zwrócić listę ze wszystkimi wynikamiz arrayOfPromises zachowując odpowiednią kolejność.
//  Jeśli wystąpi błąd w której kolwiek promisie ma on zostać zwrócony wraz z poprzednimi wynikami z promis niewykonując kolejnych
//  Wykonaj zadanie przy pomocy operatorów async/await i bez nich

const recursivePromise = (arrayOfPromises: Promise<any>[]) => {
  const returnArray: any[] = [];
  return new Promise(async (resolve, reject) => {
    arrayOfPromises.forEach(async (el) => {
      let res: any;
      try {
        res = await el;
      } catch (err) {
        returnArray.push(err);
        resolve(returnArray);
      } finally {
        returnArray.push(res);
      }
      if (returnArray.length == arrayOfPromises.length) {
        resolve(returnArray);
      }
    });
  });
};

const recursivePromiseWithThen = (arrayOfPromises: Promise<any>[]) => {
  const returnArray: any[] = [];
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach((el) => {
      Promise.resolve(el)
        .then((data) => {
          returnArray.push(data);
        })
        .catch((err) => {
          returnArray.push(err);
          resolve(returnArray);
        })
        .finally(() => {
          if (returnArray.length == arrayOfPromises.length) {
            resolve(returnArray);
          }
        });
    });
  });
};

// const recursivePromise = async (arrayOfPromises: Promise<any>[]) => {
//   const returnArray: (Promise<any> | unknown)[] = [];
//   return new Promise(async (resolve, reject) => {
//     try {
//       arrayOfPromises.reduce(async (acc: Promise<any>, curr: Promise<any>, index: number) => {
//         console.log(acc, index)
//         await acc;
//         let res;
//         try {
//           res = await curr;
//           returnArray.push(res);
//         } catch (err) {
//           returnArray.push(err);
//           resolve(returnArray);
//         }
//         if (returnArray.length === arrayOfPromises.length) {
//           resolve(returnArray);
//         }
//         return acc;
//       }, Promise.resolve(0));
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// const recursivePromiseButWithThen = (arrayOfPromises: Promise<any>[]) => {
//   const returnArray: (Promise<any> | unknown)[] = [];
//   return new Promise((resolve, reject) => {
//     try {
//       arrayOfPromises.reduce((acc: Promise<any>, curr: any) => {
//         //
//         // no i jak niby to zrobić na thenach?
//         //
//         acc
//           .then((acc) => {
//             // let res = curr.then(
//             //       // jakis kod

//             // )

//             let res = curr.then((data) => {
//               return data;
//             });
//             let obj = { res, acc };
//             return obj;
//           })
//           .then()
//           .finally(() => {
//             return acc;
//           })
//           .catch(() => {
//             return acc;
//           });
//         //   let res = curr;
//         //   return res, acc)

//         //   res = await curr;
//         //   returnArray.push(res);
//         // } catch (err) {
//         //   returnArray.push(err);
//         //   resolve(returnArray);
//         // }
//         // if (returnArray.length === arrayOfPromises.length) {
//         //   resolve(returnArray);
//         // }
//         // return acc;
//       }, Promise.resolve(0));
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

const promise1 = Promise.resolve(3);
const promise2 = Promise.resolve(true);
const promise3 = Promise.resolve(`@`);
const promise4 = Promise.resolve(false);
const promise5 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});
const promise6 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('two'), 50);
});
const promise7 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('two'), 50);
});
const arrOfPromisesWithoutRejection = [
  promise1,
  promise2,
  promise3,
  promise4,
  promise5,
  promise6,
  promise7,
];

recursivePromiseWithThen(arrOfPromisesWithoutRejection).then((values) => {
  console.log('sprawdzenie finalne', values);
});
