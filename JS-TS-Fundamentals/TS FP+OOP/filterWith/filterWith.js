// Korzystając z wbudowanej funkcji tablicy .filter stwórz funkcję filterWith, która przeszuka podaną niżej tablicę obiektów po wszystkich jej wartościach. Funkcja musi także przeszukiwać wszystkie zagnieżdżenia tablic i obiektów).
// Funkcja ma wykorzystywać rekurencję
// Funkcja ma wykorzystywać RegExp(wyrażenie regularne)
function filterWith2(data, pattern) {
  var regExpPattern = new RegExp(pattern);
  var searchFn = function (el) {
    if (typeof el === 'number') el = el.toString();
    if (typeof el !== 'string') {
      return Object.values(el).some(function (value) {
        return searchFn(value);
      });
    } else {
      return regExpPattern.test(el);
    }
  };
  return data.filter(searchFn);
}

function filterWith(data, pattern) {
  var regExpPattern = new RegExp(pattern);
  var finalArray = data.filter(function (element) {
    var elementsInArray = Object.values(element);
    var flag = false;
    function goingThroughElementsInArray(elementsInArray, regExpPattern) {
      if (typeof elementsInArray === 'number') {
        elementsInArray = elementsInArray.toString();
      }
      if (
        typeof elementsInArray === 'string' &&
        elementsInArray.match(regExpPattern)
      ) {
        flag = true;
      }
      if (Array.isArray(elementsInArray)) {
        for (var i = 0; i < elementsInArray.length; i++) {
          var singleElementInIteration = elementsInArray[i];
          if (typeof singleElementInIteration === 'number') {
            singleElementInIteration = singleElementInIteration.toString();
          } else if (Array.isArray(singleElementInIteration)) {
            goingThroughElementsInArray(
              singleElementInIteration,
              regExpPattern
            );
          } else if (typeof singleElementInIteration === 'object') {
            for (var key in singleElementInIteration) {
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
var data = [
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
console.log(filterWith2(data, 'Blair'));
