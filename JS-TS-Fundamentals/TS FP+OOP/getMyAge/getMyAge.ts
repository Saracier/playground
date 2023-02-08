// Utwórz funkcję, która jako argument przyjmuje Twój rok urodzenia. Funkcja powinna zwrócić Twój aktualny wiek niezależnie od typu inputa, który otrzyma
//
// cd "C:\Users\Michał\Desktop\pgr\playground\JS-TS-Fundamentals\TS FP+OOP\getMyAge"
// tsc getMyAge.ts

function getMyAge(input: string | number | Date) {
  if (
    typeof input !== 'string' &&
    typeof input !== 'number' &&
    !(input instanceof Date)
  ) {
    console.error('wrong input');
    return;
  }

  let inputDate: number;

  if (typeof input === 'string' || typeof input === 'number') {
    if (typeof input === 'string') {
      input = parseInt(input);
    }
    inputDate = new Date(input, 1, 1).getFullYear();
  } else {
    inputDate = input.getFullYear();
  }
  const currentDate = new Date().getFullYear();
  const currentAge = currentDate - inputDate;
  return currentAge;
}

// Sprawdzenie działania programu:
console.log(` Result 1 is: ${getMyAge(new Date(1990, 1, 1))}`);
console.log(` Result 2 is: ${getMyAge('1990')}`);
console.log(` Result 3 is: ${getMyAge(1990)}`);
