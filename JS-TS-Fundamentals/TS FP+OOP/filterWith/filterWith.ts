// Korzystając z wbudowanej funkcji tablicy .filter stwórz funkcję filterWith, która przeszuka podaną niżej tablicę obiektów po wszystkich jej wartościach. Funkcja musi także przeszukiwać wszystkie zagnieżdżenia tablic i obiektów).
// Funkcja ma wykorzystywać rekurencję
// Funkcja ma wykorzystywać RegExp(wyrażenie regularne)

type elementInArray = string | number | object | [];

function filterWith(data: object[], pattern: string) {
  const regExpPattern = new RegExp(pattern);

  // Czy można to jakoś prościej zrobić? I tak. wiem, że nie wklejam nigdzie index i array
  let finalArray = data.filter((element, index, array) => {
    const elementsInArray: elementInArray = Object.values(element);
    let flag = false;
    function goingThroughElementsInArray(
      elementsInArray: elementInArray,
      regExpPattern: RegExp
    ) {
      if (typeof elementsInArray === 'number') {
        elementsInArray = elementsInArray.toString();
      }
      if (
        typeof elementsInArray === 'string' &&
        elementsInArray.match(regExpPattern)
      ) {
        flag = true;
      }
      // Czy zasady clean code nie mówią, że powinienem to rozbić na 14 mniejszych funkcji? Bo tutaj się zrobiło ładne sphagetti, ale z drugiej strony rozbijanie tego sprawiłoby, żę to jest kod na 150 linijek
      if (Array.isArray(elementsInArray)) {
        for (let i = 0; i < elementsInArray.length; i++) {
          let singleElementInIteration = elementsInArray[i];
          if (typeof singleElementInIteration === 'number') {
            singleElementInIteration = singleElementInIteration.toString();
          } else if (Array.isArray(singleElementInIteration)) {
            goingThroughElementsInArray(
              singleElementInIteration,
              regExpPattern
            );
          } else if (typeof singleElementInIteration === 'object') {
            for (let key in singleElementInIteration) {
              if (singleElementInIteration.hasOwnProperty(key)) {
                goingThroughElementsInArray(
                  singleElementInIteration[key],
                  regExpPattern
                );
              }
            }
          }

          if (
            typeof singleElementInIteration === 'string' &&
            singleElementInIteration.match(regExpPattern)
          ) {
            flag = true;
          }
        }
      }
    }
    goingThroughElementsInArray(elementsInArray, regExpPattern);
    return flag;
  });
  return finalArray;
}

// Stara funkcja. Chciałem ją zrefaktoryzować, zeby wyszło mniej skomplikowanie, ale się nie udało
//   function search(data) {
//     // if (data[nrObjectInData] == copiedData[nrObjectInData]) {
//     // if (data._id) {
//     //   // if ((Array.isArray(data)) && Object.keys((copiedData[nrObjectInData])) == Object.keys((data[nrObjectInData]))) {
//     //   nrObjectInData++;
//     // }
//     if (Array.isArray(data)) {
//       for (let i = 0; i < data.length; i++) {
//         search(data[i]);
//       }
//     } else if (typeof data === 'object') {
//       for (let key in data) {
//         // Czy sprawdzenie if'em poniżej nie jest redundantne? W sensie przecież to iteruje po key'ach. Więc po co sprawdzać, czy ma key?

//         if (data.hasOwnProperty(key)) {
//           search(data[key]);
//         }
//       }
//     } else if (
//       (typeof data === 'string' || typeof data === 'number') &&
//       data.toString().match(regExpPattern)
//     ) {
//       result.push(copiedData[nrObjectInData - 1]);
//     }
//   }
//   search(data);
//   return result;
// }

const data = [
  {
    _id: '5e985a07feddae7617ac44f6',
    age: 24,
    eyeColor: 'brown',
    name: 'Cummings Baxter',
    gender: 'male',
    company: 'VELOS',
    email: 'cummingsbaxter@velos.com',
    phone: '+1 (907) 482-2451',
    tags: ['labore', 'elit', 'excepteur', 'nisi', 'mollit', 'anim', 'aliquip'],
    friends: [
      {
        id: 0,
        name: 'Sheppard Jensen',
      },
    ],
  },
  {
    _id: '5e985a0709dfa1e6fd93c6ad',
    age: 32,
    eyeColor: 'brown',
    name: 'Madelyn Dickson',
    gender: 'female',
    company: 'KENGEN',
    email: 'madelyndickson@kengen.com',
    phone: '+1 (984) 521-2439',
    tags: ['nisi', 'veniam', 'dolore', 'officia', 'ex', 'non', 'pariatur'],
    friends: [
      {
        id: 0,
        name: 'Bruce Barton',
      },
      {
        id: 1,
        name: 'Juliet Schmidt',
      },
      {
        id: 2,
        name: 'Horton Haley',
      },
      {
        id: 3,
        name: 'Herminia Witt',
      },
    ],
  },
  {
    _id: '5e985a0737e2306e9aef6ecd',
    age: 26,
    eyeColor: 'blue',
    name: 'Mcguire Mercado',
    gender: 'male',
    company: 'LINGOAGE',
    email: 'mcguiremercado@lingoage.com',
    phone: '+1 (963) 450-2194',
    tags: ['cupidatat', 'occaecat', 'amet', 'qui', 'elit', 'esse', 'deserunt'],
    friends: [
      {
        id: 0,
        name: 'Loraine Harper',
      },
      {
        id: 1,
        name: 'Luann Randall',
      },
      {
        id: 2,
        name: 'Obrien Rich',
      },
      {
        id: 3,
        name: 'Noble Wilkerson',
      },
    ],
  },
  {
    _id: '5e985a07148cfba58c860ec2',
    age: 26,
    eyeColor: 'brown',
    name: 'Marina Porter',
    gender: 'female',
    company: 'GORGANIC',
    email: 'marinaporter@gorganic.com',
    phone: '+1 (867) 417-3497',
    tags: [
      'laborum',
      'aliquip',
      'sit',
      'adipisicing',
      'aute',
      'cupidatat',
      'aliquip',
    ],
    friends: [
      {
        id: 0,
        name: 'Blair Hill',
      },
      {
        id: 1,
        name: 'Ebony Jimenez',
      },
    ],
  },
  {
    _id: '5e985a074984f9f08ccaaa4c',
    age: 25,
    eyeColor: 'green',
    name: 'Barlow Ferguson',
    gender: 'male',
    company: 'TOYLETRY',
    email: 'barlowferguson@toyletry.com',
    phone: '+1 (837) 484-2231',
    tags: ['est', 'dolor', 'minim', 'ut', 'anim', 'culpa', 'non'],
    friends: [
      {
        id: 0,
        name: 'Delacruz Acevedo',
      },
      {
        id: 1,
        name: 'Gloria Tanner',
      },
      {
        id: 2,
        name: 'Cantrell Myers',
      },
      {
        id: 3,
        name: 'Fisher Leonard',
      },
    ],
  },
];

console.log(filterWith(data, 'brown'));
//   // tak aby:
//   // - od 0 do 2 znaków w phrase zwracało pusty array,
//   // - a powyżej 2 ma filtrować po każdej wartości typu string lub number w obiekcie

//   function filterWith(arr, phrase) {
//     // ...
//     // return result;
//   }
//   //jako 1 argument podajemy naszą tablicę obiektów. Jako drugi argument szukaną frazę np:
//   filterWith(data, "Cummings Baxter");
//   // funkcja zwraca tablicę z konretnym obiektem:
//   const result = [
//     {
//       _id: "5e985a07feddae7617ac44f6",
//       age: 24,
//       eyeColor: "brown",
//       name: "Cummings Baxter",
//       gender: "male",
//       company: "VELOS",
//       email: "cummingsbaxter@velos.com",
//       phone: "+1 (907) 482-2451",
//       tags: ["labore", "elit", "excepteur", "nisi", "mollit", "anim", "aliquip"],
//       friends: [
//         {
//           id: 0,
//           name: "Sheppard Jensen",
//         },
//       ],
//     },
//   ];

//   filterWith(data, "nisi");
//   // jako phrase przekazujemy jeden z tagów w tablicy tags ,który znajduje się w konretnym obiekcie;

//   const result = [
//     {
//       _id: "5e985a07feddae7617ac44f6",
//       age: 24,
//       eyeColor: "brown",
//       name: "Cummings Baxter",
//       gender: "male",
//       company: "VELOS",
//       email: "cummingsbaxter@velos.com",
//       phone: "+1 (907) 482-2451",
//       tags: ["labore", "elit", "excepteur", "nisi", "mollit", "anim", "aliquip"],
//       friends: [
//         {
//           id: 0,
//           name: "Sheppard Jensen",
//         },
//       ],
//     },
//     {
//       _id: "5e985a0709dfa1e6fd93c6ad",
//       age: 32,
//       eyeColor: "brown",
//       name: "Madelyn Dickson",
//       gender: "female",
//       company: "KENGEN",
//       email: "madelyndickson@kengen.com",
//       phone: "+1 (984) 521-2439",
//       tags: ["nisi", "veniam", "dolore", "officia", "ex", "non", "pariatur"],
//       friends: [
//         {
//           id: 0,
//           name: "Bruce Barton",
//         },
//         {
//           id: 1,
//           name: "Juliet Schmidt",
//         },
//         {
//           id: 2,
//           name: "Horton Haley",
//         },
//         {
//           id: 3,
//           name: "Herminia Witt",
//         },
//       ],
//     },
//   ];

//   filterWith(data, "Delacruz Acevedo");
//   // jako phrase przekazuje dane z tablicy friends,która znajduje się w konretnym obiekcie;

//   const result = [
//     {
//       _id: "5e985a074984f9f08ccaaa4c",
//       age: 25,
//       eyeColor: "green",
//       name: "Barlow Ferguson",
//       gender: "male",
//       company: "TOYLETRY",
//       email: "barlowferguson@toyletry.com",
//       phone: "+1 (837) 484-2231",
//       tags: ["est", "dolor", "minim", "ut", "anim", "culpa", "non"],
//       friends: [
//         {
//           id: 0,
//           name: "Delacruz Acevedo",
//         },
//         {
//           id: 1,
//           name: "Gloria Tanner",
//         },
//         {
//           id: 2,
//           name: "Cantrell Myers",
//         },
//         {
//           id: 3,
//           name: "Fisher Leonard",
//         },
//       ],
//     },
//   ];
