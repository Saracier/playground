// Napisz funkcję pozwalającą połączyć dane występujące w różnych tablicach w nowy obiekt.
// Dane należy połaczyć jeśli jakiekolwiek pola obiektów z tablic są identyczne, pod warunkiem że reszta pól nie koliduje ze sobą
// Funkcja powinna przyjmować tablicę obiektów jako argument.
// Nie wszystkie tablice mają tą samą długość, oraz nie każdy obiekt posiada tą samą ilość odpowiadających mu wartości.
// Z metod tablicowych skorzystaj tylko z metody reduce().
// Kawałek kodu dla lepszego początku!
// Przykładowe obiekty które funkcja powinna móc obsłużyć (pamiętaj by przekazać tablicę obiektów):
// - {id: 1, name: "Grzegorz"}
// - {name:"Grzegorz" , surname: "NieGrzegorz", animal: { name: "Czarny", age: 1} }
// - {id: 1, city: Gliwice }
// - {age: 1, color: Black }
// - {friends: [{id: 1241, name: Adam}]}
// - {name: Adam, lastName: "NieAdam" }
// Wynikiem złączenia tablic takich obiektów powinno być:
// - {id: 1, name: "Grzegorz", surname: "NieGrzegorz", animal : {name: "Czarny", age: 1 , color: Black}, city: Gliwice}
// - {id: 1241, name: Adam, lastName: "NieAdam" }
// - {friends: [{id: 1241, name: Adam}]}

//
//
//
//
// w zadaniu musi być rekurencja
// bardziej na keys niż na entriesach
//
//
//
//

function mergeObjects(input: object[]): object {
  let final = input.reduce(
    (accumulator: object[], currentValue, currentIndex, array) => {
      // const accEntries = Object.entries(accumulator) //array key value
      // const merged =  Object.keys(currentValue).reduce((acc, el)=> {

      // }, {})

      const accEntries = Object.entries(
        accumulator.reduce((acc, CV) => {
          const entries = Object.entries(CV);

          acc = { ...acc, ...entries };
          return acc;
        }, [])
      ); //array key value z acc

      const curValEntries = Object.entries(currentValue); //array key value z CV
      // Object.keys(input[currentIndex])

      for (let i = 0; i < accEntries.length; i++) {
        for (let x = 0; x < curValEntries.length; i++) {
          const str1 = `${accEntries[i][0]}: ${accEntries[i][1]}`;
          const str2 = `${curValEntries[x][0]}: ${curValEntries[x][1]}`;
          if (str1 === str2) {
            accumulator[currentIndex] = {
              ...accumulator[currentIndex],
              ...currentValue,
            };
            return accumulator;
          }
        }
      }
      return [...accumulator, currentValue];
    },
    []
  );

  return final;
}

// Sprawdzenie poprawności działania programu
const arg = [
  { id: 1, name: 'Grzegorz' },
  {
    name: 'Grzegorz',
    surname: 'NieGrzegorz',
    animal: { name: 'Czarny', age: 1 },
  },
  { id: 1, city: 'Gliwice' },
  { age: 1, color: 'Black' },
  { friends: [{ id: 1241, name: 'Adam' }] },
  { name: 'Adam', lastName: 'NieAdam' },
];

console.log(mergeObjects(arg));
// Wynikiem złączenia tablic takich obiektów powinno być:
// {id: 1, name: "Grzegorz", surname: "NieGrzegorz", animal : {name: "Czarny", age: 1 , color: Black}, city: Gliwice}
// {id: 1241, name: Adam, lastName: "NieAdam" }
// {friends: [{id: 1241, name: Adam}]}
