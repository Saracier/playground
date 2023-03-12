// Stwórz funkcję getUrlParameters(url) która po zamontowaniu będzie zwracać wszystkie argumenty z adresu url
// Dla url = const sample = url.com/post?page=10&id=1, wynik wywołania getUrlParameters(sample) powinien być równy {page: 10, id:1}.
// Funkcja powinna zwracać wynik w takiej samej formie jak w powyższym przykładzie

function proceedKeyIsObject(
  key: string,
  value: string,
  returnObject: { any: any }
) {
  const startingindexBracket = key.indexOf('[');
  const keyName = key.slice(
    0,
    startingindexBracket
  ) as keyof typeof returnObject;
  const numberInKey = parseInt(key.slice(startingindexBracket + 1, -1));
  console.log('number in key', numberInKey);
  if (returnObject[keyName] === undefined) {
    returnObject[keyName] = [];
  }
  for (let i = 0; i < numberInKey; i++) {
    if (returnObject[keyName][i] === undefined) {
      returnObject[keyName][i] = undefined;
    }
  }

  returnObject[keyName].splice(numberInKey, 1, value);
}

function proceedKeyValue(
  key: string,
  value: string,
  returnObject: { any: any }
) {
  const regexpNumber = new RegExp('[([0-9]');
  console.log('test czy key zawiera regexp', regexpNumber.test(key));
  if (regexpNumber.test(key)) {
    proceedKeyIsObject(key, value, returnObject);
  } else {
    const keyName = key;
    returnObject = { ...returnObject, [keyName]: value };
  }
  console.log(`key value pairs: ${key}, ${value}`);
  return returnObject;
}

function getUrlParameters(urlString: string) {
  const url = new URL(urlString);
  const params1 = new URLSearchParams(url.search);
  console.log(params1);
  let returnObject = {} as any;

  for (const [key, value] of params1.entries()) {
    returnObject = proceedKeyValue(key, value, returnObject);
  }
  console.log(returnObject);
  return returnObject;
}

// function getUrlParameters(urlString: string) {
//   const url = new URL(urlString);
//   const params1 = new URLSearchParams(url.search);
//   console.log(params1);
//   let returnObject = {} as any;
//   const regexpNumber = new RegExp('[([0-9]');
//   for (const [key, value] of params1.entries()) {
//     console.log('test czy key zawiera regexp', regexpNumber.test(key));

//     if (regexpNumber.test(key)) {
//       const startingindexBracket = key.indexOf('[');
//       const keyName = key.slice(0, startingindexBracket);
//       const numberInKey = parseInt(key.slice(startingindexBracket + 1, -1));
//       console.log('number in key', numberInKey);
//       if (returnObject[keyName] === undefined) {
//         returnObject[keyName] = [];
//       }
//       if (returnObject[keyName][numberInKey] === undefined) {
//         for (let i = 0; i < numberInKey; i++) {
//           if (returnObject[keyName][i] === undefined) {
//             returnObject[keyName][i] = undefined;
//           }
//         }
//       }
//       returnObject[keyName].splice(numberInKey, 1, value);
//     } else {
//       const keyName = key;
//       returnObject = { ...returnObject, [keyName]: value };
//     }
//     console.log(`key value pairs: ${key}, ${value}`);
//   }
//   console.log(returnObject);
//   return returnObject;
// }

const urlTestString =
  'https://url.com/post?colors[2]=red&valid=true&colors[0]=green&user=Jan&age=25';
const result = getUrlParameters(urlTestString);
console.log(result);
// result === { colors: [ 'green', undefined, 'red' ], valid: true, user: 'Jan', age: 25 }
